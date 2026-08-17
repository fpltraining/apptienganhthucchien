-- =============================================================================
-- Tiếng Anh Thực Chiến — Supabase schema
--
-- Bám theo curriculum.md; các mục được trích dẫn dạng §N.
-- Giờ chuẩn: mọi mốc thời gian tuyệt đối lưu timestamptz (UTC), mọi "ngày học"
-- quy về lịch Việt Nam UTC+7 qua vn_today(). Xem chú thích ở phần Thời gian.
-- =============================================================================

create extension if not exists pgcrypto;

-- =============================================================================
-- Thời gian
--
-- Không lưu giờ Việt Nam vào cột timestamp "trần". Lưu timestamptz (thời điểm
-- tuyệt đối) rồi quy đổi khi cần *ngày*, vì ranh giới ngày mới là thứ ảnh hưởng
-- tới streak: buổi học lúc 23h ở VN phải tính cho hôm đó, còn UTC sẽ đẩy nó
-- sang ngày mai và làm đứt chuỗi oan (§10).
-- =============================================================================

create or replace function vn_today()
  returns date
  language sql
  stable
as $$
  select (now() at time zone 'Asia/Ho_Chi_Minh')::date;
$$;

comment on function vn_today() is
  'Ngày hiện tại theo lịch Việt Nam. Dùng cho mọi so sánh ngày học và streak.';

create or replace function vn_day_of(ts timestamptz)
  returns date
  language sql
  immutable
as $$
  select (ts at time zone 'Asia/Ho_Chi_Minh')::date;
$$;

-- =============================================================================
-- Kiểu liệt kê
-- =============================================================================

create type cefr_level as enum ('mat_goc', 'a1', 'a2', 'b1', 'b2');

-- Bốn nhánh lộ trình từ placement test (§4.4).
create type learning_track as enum ('A', 'B', 'C', 'D');

-- Ba mức hoàn thành, cả ba đều giữ streak (§10.2).
create type session_tier as enum ('full', 'short', 'minimal');

-- Bốn khối của buổi 45 phút (§5.1).
create type block_kind as enum ('vocabulary', 'listening', 'speaking', 'review');

-- Trục kỹ năng dùng cho cá nhân hoá (§4.3).
create type skill_kind as enum ('vocabulary', 'listening', 'speaking', 'pronunciation');

-- Thẻ hai chiều có lịch ôn riêng, vì sản sinh khó hơn nhận biết nhiều (§8.3).
create type card_direction as enum ('recognition', 'production');

-- =============================================================================
-- users
--
-- App không có đăng nhập (§13.2), nên `owner_id` không phải là người học — nó
-- là danh tính thiết bị do Supabase anonymous sign-in cấp. Một thiết bị giữ hai
-- hồ sơ học (§13.1), phân biệt bằng account_slot.
--
-- Nếu bỏ auth hoàn toàn và gọi Supabase bằng anon key trần thì RLS không có gì
-- để dựa vào, và bất kỳ ai có key cũng đọc được toàn bộ bảng. Anonymous sign-in
-- giữ trải nghiệm "không đăng nhập" mà vẫn có JWT thật để RLS bám vào.
-- =============================================================================

create table users (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,

  -- 1 = người học chính, 2 = chủ máy (§13.2).
  account_slot  smallint not null check (account_slot in (1, 2)),
  display_name  text not null,

  -- Trình độ hiện tại và nhánh lộ trình đang đi.
  current_level cefr_level not null default 'a1',
  track         learning_track,

  started_on    date,

  -- Streak (§10). current về 0 khi đứt; longest không bao giờ giảm.
  current_streak            integer not null default 0 check (current_streak >= 0),
  longest_streak            integer not null default 0 check (longest_streak >= 0),
  last_counted_day          date,

  -- Đóng băng: 2 ngày mỗi tháng, cấp lại ngày 1, không cộng dồn (§10.3).
  freezes_remaining         smallint not null default 2 check (freezes_remaining between 0 and 2),
  freezes_month             date,
  -- Tháng đã dùng quyền chuộc chuỗi (§10.4), 1 lần/tháng.
  repair_used_month         date,

  -- Nhắc học. Giờ địa phương, hiểu theo reminder_timezone.
  preferred_study_time      time not null default '20:00',
  reminder_timezone         text not null default 'Asia/Ho_Chi_Minh',
  reminders_enabled         boolean not null default true,

  -- Tuỳ chọn hiển thị (§13.1).
  audio_rate    numeric(3, 2) not null default 0.85 check (audio_rate between 0.5 and 2.0),
  text_scale    text not null default 'normal' check (text_scale in ('normal', 'large')),

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  unique (owner_id, account_slot),
  constraint longest_at_least_current check (longest_streak >= current_streak)
);

comment on column users.longest_streak is
  'Kỷ lục cá nhân, giữ vĩnh viễn kể cả sau khi đứt chuỗi (§10.3).';
comment on column users.freezes_month is
  'Tháng mà freezes_remaining đang tính cho. Khác tháng hiện tại nghĩa là cần cấp lại.';

-- =============================================================================
-- Nhật ký ngày được đóng băng
--
-- Cần lưu từng ngày, không chỉ đếm: khi người học quay lại, phải biết những
-- hôm nghỉ đã được đóng băng để nối chuỗi. Nếu chỉ đếm số lần, ngày đóng băng
-- sẽ giữ được chuỗi hôm đó rồi lại làm đứt vào buổi học kế tiếp — đúng cái mà
-- tính năng này sinh ra để tránh.
-- =============================================================================

create table streak_freezes (
  user_id     uuid not null references users (id) on delete cascade,
  frozen_day  date not null,
  created_at  timestamptz not null default now(),
  primary key (user_id, frozen_day)
);

-- =============================================================================
-- Thư viện nội dung (dùng chung, không khoá theo người học — §13.1)
-- =============================================================================

create table vocabulary_items (
  id           uuid primary key default gen_random_uuid(),
  -- Tuần xuất hiện lần đầu trong lộ trình 26 tuần (§7).
  week         smallint not null check (week between 1 and 26),
  -- Đơn vị lưu là cụm/câu có ngữ cảnh, không phải từ rời (§8.1).
  phrase       text not null,
  meaning_vi   text not null,
  example_en   text,
  audio_url    text,
  image_url    text,
  situation    text,
  -- Cụm cố định là phần giá trị cao nhất trong 500 từ lõi (§8.2).
  is_core_chunk boolean not null default false,
  created_at   timestamptz not null default now(),
  unique (phrase, meaning_vi)
);

create index vocabulary_items_week_idx on vocabulary_items (week);

-- =============================================================================
-- placement_test_results (§4)
--
-- Điểm tổng theo đúng trọng số §4.3, và nhánh lộ trình theo đúng ngưỡng §4.4 —
-- để dưới dạng cột sinh tự động, tránh việc app và DB tính lệch nhau.
-- =============================================================================

create or replace function fn_placement_total(
  pronunciation numeric, listening numeric, speaking numeric, communication numeric
) returns numeric
  language sql
  immutable
as $$
  select round(
    0.30 * pronunciation + 0.25 * listening + 0.25 * speaking + 0.20 * communication,
    2
  );
$$;

create or replace function fn_track_for_score(total numeric)
  returns learning_track
  language sql
  immutable
as $$
  select case
    when total < 30 then 'A'::learning_track   -- mất gốc, giãn thành 28 tuần
    when total < 55 then 'B'::learning_track   -- sơ cấp thấp, lộ trình chuẩn
    when total < 75 then 'C'::learning_track   -- sơ cấp cao, nén giai đoạn 1
    else 'D'::learning_track                    -- trung cấp, vào thẳng tuần 9
  end;
$$;

create table placement_test_results (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references users (id) on delete cascade,
  taken_at      timestamptz not null default now(),

  -- Bốn trục, thang 0–100 (§4.3).
  pronunciation_score numeric(5, 2) not null check (pronunciation_score between 0 and 100),
  listening_score     numeric(5, 2) not null check (listening_score between 0 and 100),
  speaking_score      numeric(5, 2) not null check (speaking_score between 0 and 100),
  communication_score numeric(5, 2) not null check (communication_score between 0 and 100),

  total_score numeric(5, 2)
    generated always as (
      fn_placement_total(pronunciation_score, listening_score, speaking_score, communication_score)
    ) stored,

  assigned_track learning_track
    generated always as (
      fn_track_for_score(
        fn_placement_total(pronunciation_score, listening_score, speaking_score, communication_score)
      )
    ) stored,

  -- Ghi đè lịch nghe (§4.4): người Việt học kiểu ngữ pháp thường có điểm nghe
  -- thấp hẳn so với ba trục còn lại. Gán một con số level duy nhất sẽ đẩy họ
  -- vào lộ trình nghe quá nhanh, nên nhánh nghe được tính riêng.
  listening_track learning_track
    generated always as (fn_track_for_score(listening_score)) stored,

  -- Tốc độ audio cao nhất còn hiểu được ≥70% (§4.3).
  max_audio_rate numeric(3, 2) not null default 0.85,

  -- Điểm bắt đầu trong lộ trình 26 tuần, suy ra từ nhánh (§4.4).
  start_week smallint not null default 1 check (start_week between 1 and 26),

  -- Câu trả lời thô, giữ để chấm lại khi thuật toán chấm thay đổi.
  raw_answers jsonb not null default '{}'::jsonb,

  -- Đây là lần đánh giá lại giữa khoá hay lần đầu (§11).
  is_initial boolean not null default true
);

create index placement_results_user_idx
  on placement_test_results (user_id, taken_at desc);

-- =============================================================================
-- daily_sessions (§5)
-- =============================================================================

create table daily_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users (id) on delete cascade,

  -- Ngày học theo lịch VN. Một bản ghi cho mỗi ngày; học thêm trong ngày thì
  -- cộng dồn vào bản ghi đó chứ không tạo ngày mới (§10.2).
  study_day   date not null default vn_today(),

  tier        session_tier not null,
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,

  -- Thời gian thực học: chỉ tính lúc app đang mở và người học đang thao tác,
  -- không tính lúc để máy đó rồi đi làm việc khác.
  active_seconds integer not null default 0 check (active_seconds >= 0),

  -- Điểm phát âm trung bình của buổi, null khi chưa chấm được (offline — §12.7).
  pronunciation_score numeric(5, 2) check (pronunciation_score between 0 and 100),

  -- Độ trễ phản xạ trung bình — chỉ số quan trọng nhất của khoá học (§3).
  avg_response_ms integer check (avg_response_ms >= 0),

  -- Tuần của lộ trình mà buổi này thuộc về.
  curriculum_week smallint check (curriculum_week between 1 and 26),

  -- Buổi có được tính vào streak không. Sai khi buổi bị bỏ dở.
  counted_for_streak boolean not null default false,

  unique (user_id, study_day)
);

create index daily_sessions_user_day_idx
  on daily_sessions (user_id, study_day desc);

-- Mỗi khối trong buổi học. Tách bảng thay vì nhét jsonb vì đây chính là dữ
-- liệu mà cơ chế cá nhân hoá đọc để biết người học yếu khối nào.
create table session_blocks (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references daily_sessions (id) on delete cascade,
  user_id      uuid not null references users (id) on delete cascade,
  study_day    date not null,

  kind         block_kind not null,
  completed    boolean not null default false,
  seconds      integer not null default 0 check (seconds >= 0),

  items_attempted integer not null default 0 check (items_attempted >= 0),
  items_correct   integer not null default 0 check (items_correct >= 0),
  avg_latency_ms  integer check (avg_latency_ms >= 0),
  avg_pronunciation numeric(5, 2) check (avg_pronunciation between 0 and 100),

  created_at   timestamptz not null default now(),

  unique (session_id, kind),
  constraint correct_not_over_attempted check (items_correct <= items_attempted)
);

create index session_blocks_user_recent_idx
  on session_blocks (user_id, study_day desc, kind);

-- =============================================================================
-- vocabulary_progress (§8.3)
--
-- Cột lịch ôn theo SM-2 (ease_factor / interval_days / repetitions). Hai cột
-- stability + difficulty để trống sẵn cho FSRS — §8.3 chọn FSRS vì cùng tỉ lệ
-- nhớ mà ít thẻ ôn hơn, và ở ngân sách 10 phút/ngày thì chênh lệch đó đáng kể.
-- Đổi bộ lịch sau này là chuyện thêm cột, không phải chuyển đổi dữ liệu.
-- =============================================================================

create table vocabulary_progress (
  user_id     uuid not null references users (id) on delete cascade,
  item_id     uuid not null references vocabulary_items (id) on delete cascade,
  -- Nhận biết và sản sinh là hai thẻ riêng, lịch riêng (§8.3).
  direction   card_direction not null,

  -- --- trạng thái SM-2 ---
  ease_factor   numeric(4, 2) not null default 2.50 check (ease_factor >= 1.30),
  interval_days integer not null default 0 check (interval_days >= 0),
  repetitions   integer not null default 0 check (repetitions >= 0),
  lapses        integer not null default 0 check (lapses >= 0),

  -- --- chỗ dành sẵn cho FSRS ---
  stability     numeric(8, 4),
  difficulty    numeric(8, 4),

  -- Lần ôn tiếp theo, theo lịch VN.
  due_on        date not null default vn_today(),
  last_reviewed_at timestamptz,

  -- Độ thành thạo 0–5 để hiển thị, suy ra từ số lần đúng liên tiếp.
  mastery       smallint not null default 0 check (mastery between 0 and 5),

  -- Đếm sai liên tiếp: đây là tín hiệu cho "từ nào luôn sai thì ôn dày hơn".
  consecutive_failures smallint not null default 0 check (consecutive_failures >= 0),

  -- Từ khó dai dẳng. Ngưỡng 6 lần quên là quy ước quen thuộc của SRS.
  is_leech boolean generated always as (lapses >= 6) stored,

  -- Thẻ đã thuộc: nói ra được dưới 1,5s, 3 lần liên tiếp cách nhau >21 ngày (§8.4).
  retired_at timestamptz,

  first_seen_at timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  primary key (user_id, item_id, direction)
);

-- Truy vấn nóng nhất của app: "hôm nay tài khoản này phải ôn thẻ nào".
create index vocabulary_progress_due_idx
  on vocabulary_progress (user_id, due_on)
  where retired_at is null;

-- Truy vấn cho phần cá nhân hoá: những từ đang sai dai dẳng.
create index vocabulary_progress_struggling_idx
  on vocabulary_progress (user_id, consecutive_failures desc)
  where retired_at is null and consecutive_failures > 0;

-- Nhật ký từng lần ôn. Cần cho việc chấm lại và cho báo cáo tuần (§10.6).
create table vocabulary_reviews (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users (id) on delete cascade,
  item_id     uuid not null references vocabulary_items (id) on delete cascade,
  direction   card_direction not null,
  session_id  uuid references daily_sessions (id) on delete set null,

  reviewed_at timestamptz not null default now(),
  -- Thang SM-2 0–5, do app suy ra từ phát âm + độ trễ chứ không hỏi người học,
  -- vì tự đánh giá vừa không chính xác vừa phá nhịp nói (§8.3).
  grade       smallint not null check (grade between 0 and 5),
  latency_ms  integer check (latency_ms >= 0),
  pronunciation_score numeric(5, 2) check (pronunciation_score between 0 and 100),

  interval_before integer not null default 0,
  interval_after  integer not null default 0
);

create index vocabulary_reviews_user_time_idx
  on vocabulary_reviews (user_id, reviewed_at desc);

-- =============================================================================
-- skill_weights — trạng thái cá nhân hoá theo dạng bài
--
-- Lưu thành bảng thay vì tính lại mỗi lần: buổi học phải dựng được giống hệt
-- nhau khi mở lại, và khi tỉ lệ bài đổi thì phải tra được vì sao nó đổi.
-- =============================================================================

create table skill_weights (
  user_id    uuid not null references users (id) on delete cascade,
  skill      skill_kind not null,

  -- 1.0 = tỉ lệ chuẩn theo giai đoạn. >1 nghĩa là đang được tăng cường.
  weight     numeric(4, 2) not null default 1.00 check (weight between 0.50 and 2.00),

  -- Độ chính xác gần đây đã dẫn tới trọng số này, giữ để giải thích.
  recent_accuracy numeric(5, 2) check (recent_accuracy between 0 and 100),
  sample_size     integer not null default 0 check (sample_size >= 0),

  updated_at timestamptz not null default now(),
  primary key (user_id, skill)
);

-- =============================================================================
-- View hỗ trợ cá nhân hoá
-- =============================================================================

-- Độ chính xác 7 ngày gần nhất theo từng khối. Đây là đầu vào của
-- updateSkillWeights() phía JS.
create or replace view v_recent_block_accuracy as
select
  b.user_id,
  b.kind,
  sum(b.items_attempted)                          as attempted,
  sum(b.items_correct)                            as correct,
  case
    when sum(b.items_attempted) = 0 then null
    else round(100.0 * sum(b.items_correct) / sum(b.items_attempted), 2)
  end                                             as accuracy,
  round(avg(b.avg_latency_ms))                    as avg_latency_ms,
  round(avg(b.avg_pronunciation), 2)              as avg_pronunciation
from session_blocks b
where b.study_day > vn_today() - interval '7 days'
group by b.user_id, b.kind;

-- Thẻ đến hạn hôm nay, đã xếp thứ tự ưu tiên: sai dai dẳng trước, rồi quá hạn
-- lâu nhất. Trần 28 thẻ/ngày (§8.3) do phía app cắt, vì còn phải chừa chỗ cho
-- thẻ mới.
create or replace view v_due_vocabulary as
select
  p.user_id,
  p.item_id,
  p.direction,
  p.due_on,
  p.mastery,
  p.consecutive_failures,
  p.is_leech,
  (vn_today() - p.due_on)                         as days_overdue,
  i.phrase,
  i.meaning_vi,
  i.audio_url,
  i.week
from vocabulary_progress p
join vocabulary_items i on i.id = p.item_id
where p.retired_at is null
  and p.due_on <= vn_today()
order by p.consecutive_failures desc, (vn_today() - p.due_on) desc;

-- =============================================================================
-- Trigger tiện ích
-- =============================================================================

create or replace function fn_touch_updated_at()
  returns trigger
  language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger users_touch
  before update on users
  for each row execute function fn_touch_updated_at();

create trigger vocabulary_progress_touch
  before update on vocabulary_progress
  for each row execute function fn_touch_updated_at();

create trigger skill_weights_touch
  before update on skill_weights
  for each row execute function fn_touch_updated_at();

-- Kỷ lục cá nhân không bao giờ giảm (§10.3). Đặt ở DB chứ không chỉ ở app, vì
-- đây là dữ liệu không tạo lại được.
create or replace function fn_keep_longest_streak()
  returns trigger
  language plpgsql
as $$
begin
  new.longest_streak := greatest(new.longest_streak, new.current_streak, old.longest_streak);
  return new;
end;
$$;

create trigger users_keep_longest
  before update of current_streak, longest_streak on users
  for each row execute function fn_keep_longest_streak();

-- Cấp lại 2 ngày đóng băng khi sang tháng mới, và không cộng dồn (§10.3).
create or replace function fn_refill_freezes(p_user_id uuid)
  returns void
  language plpgsql
as $$
declare
  v_month date := date_trunc('month', vn_today())::date;
begin
  update users
     set freezes_remaining = 2,
         freezes_month     = v_month
   where id = p_user_id
     and (freezes_month is distinct from v_month);
end;
$$;

-- =============================================================================
-- Row Level Security
--
-- Mọi bảng học tập đều lọc qua users.owner_id. Đây là chỗ quy tắc §13.1 được
-- thực thi ở tầng dữ liệu: một truy vấn quên lọc theo tài khoản sẽ không lấy
-- được gì thay vì lặng lẽ trả về dữ liệu của người kia.
-- =============================================================================

alter table users                  enable row level security;
alter table streak_freezes         enable row level security;
alter table placement_test_results enable row level security;
alter table daily_sessions         enable row level security;
alter table session_blocks         enable row level security;
alter table vocabulary_progress    enable row level security;
alter table vocabulary_reviews     enable row level security;
alter table skill_weights          enable row level security;
alter table vocabulary_items       enable row level security;

create policy users_owner_all on users
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Một macro thủ công: mọi bảng con đều kiểm tra qua users.
create or replace function fn_owns_user(p_user_id uuid)
  returns boolean
  language sql
  stable
  security definer
  set search_path = public
as $$
  select exists (
    select 1 from users u
     where u.id = p_user_id
       and u.owner_id = auth.uid()
  );
$$;

create policy streak_freezes_owner on streak_freezes
  for all using (fn_owns_user(user_id)) with check (fn_owns_user(user_id));

create policy placement_owner on placement_test_results
  for all using (fn_owns_user(user_id)) with check (fn_owns_user(user_id));

create policy sessions_owner on daily_sessions
  for all using (fn_owns_user(user_id)) with check (fn_owns_user(user_id));

create policy blocks_owner on session_blocks
  for all using (fn_owns_user(user_id)) with check (fn_owns_user(user_id));

create policy vocab_progress_owner on vocabulary_progress
  for all using (fn_owns_user(user_id)) with check (fn_owns_user(user_id));

create policy vocab_reviews_owner on vocabulary_reviews
  for all using (fn_owns_user(user_id)) with check (fn_owns_user(user_id));

create policy skill_weights_owner on skill_weights
  for all using (fn_owns_user(user_id)) with check (fn_owns_user(user_id));

-- Thư viện nội dung: ai đăng nhập cũng đọc được, không ai sửa được từ client.
create policy vocabulary_items_read on vocabulary_items
  for select using (auth.role() = 'authenticated');
