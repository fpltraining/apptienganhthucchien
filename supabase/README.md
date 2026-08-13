# Supabase schema

Schema và logic cá nhân hoá cho app, bám theo `curriculum.md` (trích dẫn dạng §N).

```
schema.sql            Bảng, view, trigger, RLS
personalization.js    Logic cá nhân hoá, ES5 thuần, không phụ thuộc gì
personalization.test.js
```

Áp dụng: dán `schema.sql` vào SQL Editor của Supabase, hoặc
`supabase db execute --file supabase/schema.sql`.

## Yêu cầu → chỗ đáp ứng

| Yêu cầu | Ở đâu |
|---|---|
| `users`: level, ngày bắt đầu, streak hiện tại, streak dài nhất, ngày đóng băng còn lại, giờ học ưa thích | `users` |
| `vocabulary_progress` theo spaced repetition, độ thành thạo, lần ôn tiếp theo | `vocabulary_progress` + `vocabulary_reviews` |
| `daily_sessions`: phần nào đã xong, điểm phát âm, thời gian thực học | `daily_sessions` + `session_blocks` |
| `placement_test_results` để chọn điểm bắt đầu | `placement_test_results` |
| Sai nhiều một dạng bài → tăng tỉ lệ dạng đó | `skill_weights`, view `v_recent_block_accuracy`, hàm `updateSkillWeights()` + `composeSession()` |
| Một từ luôn sai → tăng tần suất ôn | `vocabulary_progress.consecutive_failures`, view `v_due_vocabulary`, hàm `scheduleSm2()` + `selectDueCards()` |

Cơ chế "từ luôn sai" có hiệu lực ở hai chỗ, cố ý: `scheduleSm2()` ép khoảng cách
ôn về 1 ngày, và `selectDueCards()` xếp nó lên đầu hàng đợi khi phải cắt bớt vì
chạm trần 28 thẻ/ngày.

## Giờ giấc

Mốc thời gian tuyệt đối lưu `timestamptz` (UTC). "Ngày học" quy về lịch Việt Nam
qua `vn_today()` / `vn_day_of()`, và phía JS là `vnDayKey()`.

Không lưu giờ VN vào cột timestamp trần. Thứ thật sự quan trọng là **ranh giới
ngày**, vì streak tính theo ngày: buổi học lúc 23h ở VN phải tính cho hôm đó,
còn mốc UTC sẽ đẩy nó sang hôm sau và làm đứt chuỗi oan (§10).

## Hai điểm cần anh quyết trước khi dùng

### 1. Schema này mâu thuẫn với quyết định #6, #7, #8 trong giáo trình

Giáo trình đã chốt: **không đăng nhập, không tài khoản, không sao lưu, dữ liệu
nằm hoàn toàn trên máy** (§13.2, §13.2b). Đưa Supabase vào là đảo ngược cả ba —
nó chính là backend đồng bộ mà mục 13.2b nói là không làm.

Không phải chuyện xấu: mục 12.5 vốn đã cần một backend nhỏ để giữ API key, và
có Supabase thì rủi ro 🔴 "mất máy là mất trắng 6 tháng" biến mất. Nhưng đây là
một quyết định khác với thứ đã ghi trong giáo trình, nên nếu dùng thì phải sửa
mục 13.2b và bảng quyết định ở mục 15, đừng để hai tài liệu nói ngược nhau.

**Về bảo mật:** app không có đăng nhập, nhưng gọi Supabase bằng anon key trần thì
RLS không có gì để dựa vào, và ai có key cũng đọc được toàn bộ bảng. Schema này
giả định **anonymous sign-in** — người học vẫn không thấy màn hình đăng nhập nào,
nhưng mỗi máy có một JWT thật để RLS bám vào. `users.owner_id` là danh tính
*thiết bị*, còn hai hồ sơ học phân biệt bằng `account_slot` (§13.1).

### 2. Đang có hai bộ lịch ôn

- `personalization.js` dùng **SM-2** — anh chỉ định "SM-2 hoặc tương tự".
- App trong `src/` dùng **FSRS** — §8.3 chọn FSRS vì cùng tỉ lệ nhớ mà ít thẻ ôn
  hơn, và ở ngân sách 10 phút/ngày thì chênh lệch đó đáng kể.

Bảng `vocabulary_progress` giữ cột cho cả hai (`ease_factor`/`interval_days`/
`repetitions` cho SM-2, `stability`/`difficulty` để trống cho FSRS), nên đổi bộ
lịch là chuyện ghi cột khác chứ không phải chuyển đổi dữ liệu.

Nhưng **chạy song song hai bộ lịch trên cùng một người học thì hỏng**: hai bên sẽ
tính ra hai ngày ôn khác nhau cho cùng một thẻ. Chọn một:

- **Giữ FSRS** (khớp giáo trình): dùng `schema.sql` nhưng bỏ qua `scheduleSm2()`,
  ghi `stability`/`difficulty` thay cho `ease_factor`/`interval_days`. Các hàm còn
  lại trong `personalization.js` không dính tới bộ lịch nên dùng được nguyên.
- **Chuyển sang SM-2**: đơn giản hơn, không cần thư viện, nhưng nhiều thẻ ôn hơn
  cho cùng tỉ lệ nhớ — và cần sửa §8.3.

`RETENTION_INTERVAL_SCALE = 1.15` trong `personalization.js` là cách xấp xỉ mục
tiêu 0.88 của §8.3 bằng SM-2, vì SM-2 không có tham số tỉ lệ nhớ. FSRS nhận thẳng
0.88 — nếu chuyển sang FSRS thì bỏ hệ số đó đi, đừng cộng dồn cả hai.

## Chạy test

```bash
npm test                    # tất cả
npx vitest run supabase     # chỉ phần này
```
