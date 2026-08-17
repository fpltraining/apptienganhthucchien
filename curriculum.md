# Giáo trình "Tiếng Anh Thực Chiến" — Lộ trình 6 tháng

> **Trạng thái:** BẢN THẢO ĐỂ DUYỆT — chưa code.
> **Phiên bản:** 1.0
> **Người học mục tiêu:** Người Việt trưởng thành, trình độ **Sơ cấp (A1–A2)**, dùng smartphone thành thạo cơ bản.
> **Cam kết thời gian:** 45 phút/ngày × 6 tháng (26 tuần).
> **Mục tiêu:** Giao tiếp thực chiến — nói được, nghe được, xử lý được tình huống thật. KHÔNG luyện thi.

---

## Mục lục

1. [Triết lý thiết kế](#1-triết-lý-thiết-kế)
2. [Hồ sơ người học & giả định](#2-hồ-sơ-người-học--giả-định)
3. [Mục tiêu đầu ra đo được](#3-mục-tiêu-đầu-ra-đo-được)
4. [Placement Test — đánh giá đầu vào](#4-placement-test--đánh-giá-đầu-vào)
5. [Kiến trúc buổi học 45 phút](#5-kiến-trúc-buổi-học-45-phút)
6. [Lộ trình 6 tháng — 3 giai đoạn](#6-lộ-trình-6-tháng--3-giai-đoạn)
7. [Bản đồ 26 tuần tình huống thực chiến](#7-bản-đồ-26-tuần-tình-huống-thực-chiến)
8. [Hệ từ vựng & thuật toán SRS](#8-hệ-từ-vựng--thuật-toán-srs)
9. [Giáo trình phát âm cho người Việt](#9-giáo-trình-phát-âm-cho-người-việt)
10. [Cơ chế Streak & động lực](#10-cơ-chế-streak--động-lực)
11. [Đánh giá định kỳ & tái phân lộ trình](#11-đánh-giá-định-kỳ--tái-phân-lộ-trình)
12. [Kiến trúc hội thoại lai & ngân sách LLM](#12-kiến-trúc-hội-thoại-lai--ngân-sách-llm)
13. [Hai người dùng — hai lộ trình độc lập](#13-hai-người-dùng--hai-lộ-trình-độc-lập)
14. [Bảng kê nội dung cần sản xuất](#14-bảng-kê-nội-dung-cần-sản-xuất)
15. [Rủi ro & những gì đã chốt](#15-rủi-ro--những-gì-đã-chốt)
16. [Đưa app tới máy ba bạn](#16-đưa-app-tới-máy-ba-bạn)

---

## 1. Triết lý thiết kế

Sáu nguyên tắc chi phối mọi quyết định trong tài liệu này. Nếu bạn muốn đổi
hướng, hãy đổi ở đây trước — phần còn lại sẽ phải viết lại theo.

| # | Nguyên tắc | Hệ quả thiết kế |
|---|---|---|
| 1 | **Output trước input.** Người lớn mất gốc thường "hiểu mà không nói được". | ≥ 40% thời lượng mỗi buổi là mở miệng nói. Không có bài học nào chỉ ngồi nghe. |
| 2 | **Tình huống là đơn vị học, không phải chủ điểm ngữ pháp.** | Ngữ pháp chỉ xuất hiện khi tình huống cần. Không có "tuần học thì hiện tại hoàn thành". |
| 3 | **Câu trọn vẹn, không từ rời.** | SRS lưu **cụm + câu mẫu có ngữ cảnh**, không lưu từ đơn dịch nghĩa. |
| 4 | **Nghe âm thật, không nghe âm giáo khoa.** | Audio có tốc độ tự nhiên, có tiếng ồn nền, có nhiều accent. Bản "chậm" chỉ là nạng, gỡ dần. |
| 5 | **Sai là dữ liệu, không phải thất bại.** | Không có màn hình "Wrong!" đỏ chói. Feedback dạng "gần đúng rồi — nghe lại chỗ này". |
| 6 | **Thiết kế cho người sẽ quên và sẽ bỏ vài hôm.** | Streak khoan dung (mục 10), ôn tập tự động chèn lại nội dung rơi rụng. |

**Phân bổ kỹ năng toàn khoá (theo tổng thời lượng 6 tháng):**

```
Nói / phản xạ      ████████████████████  40%
Nghe hiểu          ██████████████        28%
Từ vựng (SRS)      ███████████           22%
Ôn tập & đánh giá  █████                 10%
```

---

## 2. Hồ sơ người học & giả định

**Chân dung:** Nam trưởng thành, tiếng Việt là tiếng mẹ đẻ, từng học tiếng Anh
phổ thông đã lâu. Đọc hiểu được câu đơn, nói được câu ngắn rời rạc, nghe được
nếu người ta nói chậm. Dùng smartphone tốt (YouTube, Facebook, tự cài app,
tự bấm ghi âm).

**Điểm mạnh khai thác được:**
- Đã biết bảng chữ cái và một vốn từ thụ động (đọc hiểu > nghe/nói rất nhiều).
- Có kỷ luật của người trưởng thành — 45 phút/ngày là cam kết thật, không cần
  gamify kiểu trẻ con.
- Động lực rõ ràng (giao tiếp thật), không phải điểm số.

**Điểm yếu phải xử lý:**
- **Khoảng cách nghe/nói vs đọc/viết rất lớn** — nghe là nút thắt số 1.
- **Phát âm hoá thạch:** đã quen đọc tiếng Anh theo âm Việt trong nhiều năm; sửa
  khó hơn dạy mới. Cần can thiệp sớm và lặp lại suốt 6 tháng.
- **Sợ mất mặt khi nói sai** — rào cản tâm lý lớn hơn rào cản ngôn ngữ ở tuổi
  trưởng thành.
- **Mắt và tai:** cần chữ đủ lớn, audio đủ rõ, không có timer đếm ngược gây áp lực.

**Giả định thiết kế (toàn bộ quyết định kỹ thuật đã chốt ở mục 15):**
- Học chủ yếu trên điện thoại, có tai nghe, học ở nơi nói ra tiếng được.
- Không có giáo viên người thật kèm — app phải tự đóng vai bạn thoại.
- Tiếng Việt được dùng làm ngôn ngữ giải thích trong giai đoạn 1, giảm dần và
  gần như biến mất ở giai đoạn 3.

---

## 3. Mục tiêu đầu ra đo được

Mỗi mốc phải **kiểm chứng được bằng một bài test cụ thể**, không phải cảm nhận.

| Mốc | Có thể làm được gì | Cách đo |
|---|---|---|
| **Hết tháng 2** | Nói trôi 60 câu lõi về bản thân/gia đình/nhu cầu hàng ngày. Phát âm đúng 12 âm khó và có đuôi từ. Nghe hiểu câu đơn tốc độ 0.85×. | Test A: 20 câu shadowing chấm điểm phát âm ≥ 70; nghe 15 câu điền từ ≥ 12/15. |
| **Hết tháng 4** | Xử lý trọn vẹn 10 tình huống đời thường bằng hội thoại 6–10 lượt, có thể hỏi lại khi không hiểu. Nghe tốc độ 1.0×. | Test B: 3 role-play ngẫu nhiên, hoàn thành mục tiêu giao tiếp không cần tiếng Việt. |
| **Hết tháng 6** | Giữ được hội thoại 3–5 phút về việc/đời sống với người bản xứ nói tốc độ tự nhiên, gồm 1 tình huống áp lực (phỏng vấn / họp / khiếu nại). Hiểu được ≥ 3 accent. | Test C: phỏng vấn mô phỏng 5 phút + 1 tình huống khó bốc ngẫu nhiên. |

**Chỉ số định lượng theo dõi liên tục:**

| Chỉ số | Đầu vào (dự kiến) | Cuối tháng 2 | Cuối tháng 4 | Cuối tháng 6 |
|---|---|---|---|---|
| Từ/cụm chủ động (nói ra được) | ~150 | 500 | 900 | 1.300 |
| Độ dài lượt nói trung bình | 3–4 từ | 7–8 từ | 12–14 từ | 18–20 từ |
| Độ trễ phản xạ (giây trước khi trả lời) | 6–8s | 4s | 2.5s | < 1.5s |
| Điểm phát âm (0–100) | 40–50 | 70 | 80 | 85 |
| Tốc độ nghe chịu được | 0.7× | 0.85× | 1.0× | 1.15× |

> **Ghi chú:** "Độ trễ phản xạ" là chỉ số quan trọng nhất của khoá này và là thứ
> phân biệt app thực chiến với app học từ vựng. Nó phải được đo tự động từ tháng
> đầu tiên.

---

## 4. Placement Test — đánh giá đầu vào

### 4.1 Nguyên tắc

Tham khảo cách Speak, ELSA và TalkPal làm: **bài test nói ngắn, cảm giác như trò
chuyện chứ không như thi**, cho kết quả tức thì theo thang CEFR. Các app này đánh
giá trên 4 trục — phát âm, độ trôi chảy, vốn từ, ngữ pháp — và phần lớn hoàn tất
trong 2–15 phút, một số dùng dạng gọi thoại với avatar để người học không thấy
áp lực.

Ta lấy tinh thần đó nhưng **rút ngắn còn ~7 phút** và **bỏ hoàn toàn chữ "test"**
khỏi giao diện. Người học nhìn thấy: *"Nói chuyện với app 7 phút để app biết nên
bắt đầu từ đâu"*.

### 4.2 Cấu trúc bài đánh giá (7 phút, 5 phần)

| # | Phần | Thời gian | Người học làm gì | App đo cái gì |
|---|---|---|---|---|
| 1 | **Khởi động** | 30s | Nghe câu chào, bấm nút nói tên mình | Micro có hoạt động không; phá băng tâm lý |
| 2 | **Đọc to 6 câu** | 90s | Đọc 6 câu in sẵn, độ khó tăng dần | **Phát âm**: âm cuối, cụm phụ âm, trọng âm, /θ/ /s/ /z/ /ʃ/ |
| 3 | **Nghe & chọn** | 120s | 8 đoạn audio ngắn (5–12s), chọn đáp án đúng trong 3 ảnh/câu. Tốc độ tăng dần 0.75× → 1.1× | **Ngưỡng nghe**: tốc độ tối đa còn hiểu được |
| 4 | **Trả lời tự do** | 150s | 4 câu hỏi mở tăng dần độ khó | **Vốn từ chủ động, ngữ pháp, độ trôi chảy, độ trễ phản xạ** |
| 5 | **Tình huống thử** | 90s | 1 role-play 3 lượt: nhân viên quán cà phê hỏi order | **Năng lực giao tiếp thật** — có đạt mục tiêu không |

**4 câu hỏi mở ở phần 4 (thang bậc):**
1. `What is your name and where do you live?` — A0/A1 phải trả lời được
2. `Tell me about your family.` — A1 nếu nói được ≥ 2 câu
3. `What did you do yesterday?` — A2 nếu dùng đúng thì quá khứ
4. `What do you want to use English for?` — B1 nếu nói được ≥ 4 câu có liên kết

### 4.3 Cách chấm điểm

Điểm tổng 0–100, ghép từ 4 trục có trọng số:

```
Điểm tổng = 0.30 × Phát âm      (phần 2)
          + 0.25 × Nghe hiểu    (phần 3)
          + 0.25 × Nói tự do    (phần 4)
          + 0.20 × Giao tiếp    (phần 5)
```

Chi tiết từng trục:

| Trục | Thang đo | Nguồn dữ liệu |
|---|---|---|
| Phát âm | % phoneme khớp, có tính riêng điểm phạt cho việc nuốt âm cuối | Speech-to-text + phoneme alignment |
| Nghe hiểu | Tốc độ audio cao nhất vẫn còn đúng ≥ 70% | Điểm số theo bậc tốc độ |
| Nói tự do | Số từ/lượt, độ đa dạng từ vựng, độ trễ trước khi nói, tỉ lệ câu hoàn chỉnh | ASR transcript + timestamp |
| Giao tiếp | Có đạt mục tiêu của role-play không (order được món / hỏi được giá) | Rule-based intent check |

### 4.4 Phân nhánh lộ trình theo kết quả

| Điểm | Nhãn | Lộ trình được gán |
|---|---|---|
| 0–29 | Mất gốc | **Track A** — chèn 2 tuần "tiền giai đoạn 1" (bảng chữ cái âm, 100 từ sinh tồn), lộ trình giãn thành 28 tuần |
| 30–54 | Sơ cấp thấp (A1) | **Track B** — lộ trình chuẩn 26 tuần, giai đoạn 1 đầy đủ |
| 55–74 | Sơ cấp cao (A2) | **Track C** — nén giai đoạn 1 từ 8 → 5 tuần, dồn 3 tuần dư cho giai đoạn 3 |
| 75–100 | Trung cấp (B1+) | **Track D** — bỏ giai đoạn 1, vào thẳng tuần 9, thêm 8 tuần tình huống nâng cao |

> **Dự kiến cho ba bạn:** rơi vào **Track C** (A2, đọc hiểu tốt hơn nghe nói).
> Nhưng nếu điểm nghe thấp bất thường so với các trục khác — kịch bản rất hay gặp
> ở người Việt học kiểu ngữ pháp — hệ thống phải **ghi đè**: giữ Track C cho phần
> từ vựng/nói nhưng **dùng lịch nghe của Track B**. Đây là điểm khác biệt quan
> trọng so với các app chỉ gán một con số level duy nhất.

### 4.5 Điều chỉnh động sau khi bắt đầu

Placement test **không phải là quyết định một lần**:

- **Sau tuần 2 và tuần 4:** app tự đối chiếu hiệu suất thực tế với track đã gán.
  Nếu độ chính xác > 90% liên tục 5 buổi → đề xuất tăng track. Nếu < 60% liên tục
  3 buổi → tự động hạ độ khó, **không hỏi, không thông báo dạng "bạn đang yếu"**.
- **Micro-placement mỗi tuần:** 2 câu thăm dò cài lẫn trong buổi học ngày thứ 6,
  người học không biết đó là đo lường.

---

## 5. Kiến trúc buổi học 45 phút

### 5.1 Bốn khối cố định

Thứ tự này là cố định và có lý do: từ vựng nạp trước để phần nghe có nguyên liệu;
nghe trước nói để tai định hình âm trước khi miệng bắt chước; ôn tập cuối để chốt
trí nhớ trước khi ngủ.

| Khối | Thời gian | Tên hiển thị | Nội dung |
|---|---|---|---|
| **1. Từ vựng (SRS)** | **10 phút** | "Từ hôm nay" | 8 thẻ mới + 12–20 thẻ ôn đến hạn. Mỗi thẻ = cụm/câu + audio + ảnh, không phải từ đơn. |
| **2. Nghe** | **12 phút** | "Nghe thật" | 1 đoạn hội thoại thật 60–90s theo tình huống của tuần, nghe 3 vòng theo 3 tầng nhiệm vụ. |
| **3. Nói** | **18 phút** | "Mở miệng" | 8' shadowing + 10' phản xạ hội thoại (role-play với app). Khối lớn nhất, có chủ đích. |
| **4. Ôn nhanh** | **5 phút** | "Chốt lại" | 10 câu hỏi chớp nhoáng trộn nội dung 7 ngày qua + 1 câu tự do "hôm nay bạn nói được gì?". |

### 5.2 Chi tiết từng khối

#### Khối 1 — Từ vựng SRS (10 phút)

```
0:00–0:03  Thẻ đến hạn ôn (12–20 thẻ, nhanh, nhận diện)
0:03–0:08  8 thẻ mới: nghe → nhìn ảnh → nhắc lại → dùng trong 1 câu
0:08–0:10  Recall chủ động: app đọc tiếng Việt, người học nói tiếng Anh
```

Quy tắc: **mọi thẻ đều phải nói ra tiếng**, không có thẻ chỉ bấm "đã nhớ". Thẻ
được đánh dấu thuộc chỉ khi người học **phát âm được**, không phải khi nhận ra mặt chữ.

#### Khối 2 — Nghe (12 phút)

Nghe cùng một đoạn 3 vòng với 3 mục tiêu khác nhau — kỹ thuật "narrow listening",
hiệu quả hơn nhiều so với nghe 3 đoạn khác nhau mỗi đoạn 1 lần:

| Vòng | Tốc độ | Nhiệm vụ | Có phụ đề? |
|---|---|---|---|
| 1 | 0.85× (GĐ1) → 1.0× (GĐ2) → 1.1× (GĐ3) | **Nghe ý chính**: chuyện gì đang xảy ra, ai nói với ai | Không |
| 2 | 1.0× | **Nghe chi tiết**: 5 câu hỏi cụ thể (số, giờ, tên, giá) | Không |
| 3 | 1.0× | **Nghe từng chữ**: điền vào 8 chỗ trống trong transcript | Có, sau khi làm xong |

Audio bắt buộc có tiếng ồn nền thực tế (quán ăn, sân bay, đường phố) từ tuần 5
trở đi. Nghe trong phòng thu sạch là lý do người học "hiểu trong app mà ra đời
không hiểu gì".

#### Khối 3 — Nói (18 phút) — khối quan trọng nhất

```
0:00–0:08  SHADOWING
           · Vòng 1: nghe + nhìn transcript, nói theo, có độ trễ
           · Vòng 2: nói đè lên audio, đồng thời
           · Vòng 3: bỏ transcript, chỉ nghe và nói theo
           · App chấm: điểm phát âm từng câu, đánh dấu 3 câu tệ nhất → lặp lại

0:08–0:18  PHẢN XẠ HỘI THOẠI
           · App đóng vai (nhân viên/bác sĩ/nhà tuyển dụng...)
           · 6–10 lượt trao đổi, mỗi lượt người học có tối đa 8 giây để đáp
           · Có nút "Help me" — gợi ý 3 mẫu câu, nhưng bị trừ điểm phản xạ
           · Kết thúc: app chấm "bạn có đạt mục tiêu không" + phát lại giọng
             người học so với giọng mẫu
```

**Cơ chế đo phản xạ:** đồng hồ ngầm chạy từ lúc app nói xong đến lúc người học
bật ra tiếng. Đây là chỉ số hiển thị nổi bật nhất trong báo cáo tuần, vì nó cải
thiện thấy rõ và tạo động lực tốt hơn "số từ đã học".

#### Khối 4 — Ôn nhanh (5 phút)

10 câu hỏi trộn ngẫu nhiên, ưu tiên nội dung ở khoảng "sắp quên" theo lịch SRS:
- 4 câu từ vựng (nghe → nói nghĩa, hoặc nghe tiếng Việt → nói tiếng Anh)
- 3 câu nghe chớp (audio 3s → chọn/nói lại)
- 2 câu tình huống ("Bạn muốn hỏi giá món này, bạn nói gì?")
- 1 câu tự do: **"Hôm nay bạn học được câu nào? Nói lại đi."** — ghi âm, lưu lại
  thành nhật ký giọng nói để tháng sau nghe lại. Đây là công cụ tạo động lực mạnh
  nhất của cả app: nghe lại chính mình 3 tháng trước.

### 5.3 Nhịp tuần

| Ngày | Loại buổi | Nội dung |
|---|---|---|
| Thứ 2–6 | **Buổi chuẩn** | 4 khối như trên, nội dung mới theo tình huống của tuần |
| Thứ 7 | **Buổi thực chiến** | Bỏ khối 1–2. 45 phút = 1 role-play dài 15 phút (tình huống của tuần, không gợi ý) + nghe lại và tự chấm + ôn tập nặng |
| Chủ nhật | **Buổi nhẹ (15 phút)** | Chỉ SRS + nghe podcast tuỳ chọn. **Không tính là ngày nghỉ nhưng vẫn giữ streak.** |

> Chủ nhật nhẹ là thiết kế có chủ đích: người lớn tuổi cần một ngày "thở" mỗi
> tuần, và việc app chủ động cho phép sẽ giảm cảm giác tội lỗi — thứ giết chết
> streak nhanh hơn cả sự lười.

---

## 6. Lộ trình 6 tháng — 3 giai đoạn

### GIAI ĐOẠN 1 — NỀN TẢNG (Tháng 1–2 · Tuần 1–8)

> **Khẩu hiệu nội bộ:** *Sửa cái tai và cái miệng trước khi nhồi thêm chữ.*

**Mục tiêu:**
- 500 từ/cụm lõi, chủ động nói ra được (không phải nhận biết).
- Sửa xong 12 lỗi phát âm đặc trưng người Việt (mục 9).
- Nghe hiểu câu đơn ở tốc độ 0.85×.
- Nói được câu 7–8 từ mà không dịch ngầm từ tiếng Việt.

**Trọng số thời lượng:** Phát âm 35% · Từ vựng 30% · Nghe 20% · Hội thoại 15%

**Đặc thù giai đoạn:**
- Mỗi buổi có **3 phút "phòng lab âm"** chèn đầu khối 3: luyện đúng 1 âm khó của
  tuần, có phổ sóng so sánh giọng người học với giọng mẫu.
- Tiếng Việt dùng thoải mái trong phần giải thích.
- Hội thoại còn ngắn (3–4 lượt), có kịch bản, được nhìn gợi ý.
- **Không dạy ngữ pháp thành bài.** Các mẫu câu (`I'd like...`, `Can I...?`,
  `How much...?`, `Where is...?`) được dạy như "khối lắp ghép", giải thích cấu
  trúc chỉ trong 1 câu tiếng Việt.

**Chốt giai đoạn (cuối tuần 8):** Test A.

---

### GIAI ĐOẠN 2 — PHẢN XẠ TÌNH HUỐNG (Tháng 3–4 · Tuần 9–17)

> **Khẩu hiệu nội bộ:** *Không cần nói hay, cần nói được việc.*

**Mục tiêu:**
- Xử lý trọn vẹn 9 nhóm tình huống đời thường, mỗi tình huống 6–10 lượt hội thoại.
- Học **kỹ năng sửa lỗi giao tiếp**: hỏi lại, nói lại cách khác, câu giờ khi bí từ.
- Nghe tốc độ tự nhiên 1.0× có tiếng ồn nền.
- Vốn từ chủ động lên 900.

**Trọng số:** Hội thoại 40% · Nghe 25% · Từ vựng 20% · Phát âm 15%

**Đặc thù giai đoạn:**
- **Gỡ nạng dần:** tuần 9–11 còn gợi ý câu; tuần 12–14 chỉ gợi ý từ khoá; tuần
  15–17 không gợi ý.
- **Dạy bộ "câu cứu hộ"** — quan trọng ngang từ vựng, dạy ngay tuần 9:

  | Tình huống | Câu cứu hộ |
  |---|---|
  | Không nghe kịp | `Sorry, could you say that again?` / `Could you speak a bit slower?` |
  | Không hiểu từ | `What does "___" mean?` / `Sorry, I don't know that word.` |
  | Bí từ, cần câu giờ | `Let me think...` / `How do I say this...` / `It's like a...` |
  | Diễn đạt vòng | `I mean, the thing you use for...` |
  | Xác nhận lại | `So you mean...?` / `Just to make sure — ...` |

- **Biến thể bất ngờ:** từ tuần 12, mỗi role-play có 20% khả năng đối phương lệch
  kịch bản (hết món, đổi giờ, hiểu nhầm). Đây là điểm chuyển từ "học thuộc" sang
  "phản xạ".

**Chốt giai đoạn (cuối tuần 17):** Test B.

---

### GIAI ĐOẠN 3 — TỐC ĐỘ & TÌNH HUỐNG KHÓ (Tháng 5–6 · Tuần 18–26)

> **Khẩu hiệu nội bộ:** *Nhanh, dưới áp lực, với người nói giọng lạ.*

**Mục tiêu:**
- Độ trễ phản xạ < 1.5 giây.
- Chịu được tốc độ 1.15× và ít nhất 3 accent ngoài giọng Mỹ chuẩn.
- Xử lý được tình huống áp lực cao: phỏng vấn, họp, khiếu nại, khẩn cấp.
- Giữ hội thoại tự do 3–5 phút không kịch bản.

**Trọng số:** Hội thoại tự do 45% · Nghe khó 30% · Phát âm/ngữ điệu 15% · Từ vựng 10%

**Đặc thù giai đoạn:**
- **Chế độ đồng hồ:** giới hạn đáp 8s → 5s → 3s theo tuần.
- **Accent gauntlet:** cùng một nội dung, nhiều giọng — Ấn Độ, Anh-Anh, Úc,
  Philippines, Mỹ miền Nam. Đây là thứ quyết định giữa "hiểu app" và "hiểu người".
- **Hội thoại mở:** không kịch bản, app dẫn dắt tự do quanh chủ đề, chấm theo độ
  dài lượt nói và khả năng duy trì mạch.
- **Buổi "chống sập":** cố tình đưa vào audio khó nghe (điện thoại rè, nhiều
  người nói cùng lúc) để luyện chiến lược đối phó chứ không phải hiểu 100%.
- **Đóng băng nội dung mới ở tuần 25–26:** không thêm từ mới, chỉ củng cố.

**Chốt khoá (cuối tuần 26):** Test C + kế hoạch duy trì sau khoá.

---

## 7. Bản đồ 26 tuần tình huống thực chiến

Ký hiệu độ khó: 🟢 dễ · 🟡 trung bình · 🔴 khó

### Giai đoạn 1 — Tuần 1–8

| Tuần | Tình huống | Mục tiêu giao tiếp cụ thể | Trọng tâm phát âm | Từ mới |
|---|---|---|---|---|
| 1 🟢 | **Chào hỏi & giới thiệu bản thân** | Chào, nói tên/tuổi/quê/nghề, chào tạm biệt | Âm cuối `/t/ /d/ /k/` — lỗi nặng nhất của người Việt | 60 |
| 2 🟢 | **Số, giờ, ngày tháng, giá tiền** | Nói và nghe được số điện thoại, giá, giờ hẹn | `/θ/` (three, thirty) vs `/t/`; phân biệt 13 vs 30 | 65 |
| 3 🟢 | **Gia đình & công việc** | Kể về gia đình, nói mình làm nghề gì, làm ở đâu | Đuôi `-s` số nhiều: `/s/ /z/ /ɪz/` | 60 |
| 4 🟢 | **Đồ ăn & gọi món cơ bản** | Gọi món, hỏi giá, nói "cho tôi...", trả tiền | Cụm phụ âm đầu: `str-`, `spr-`, `br-` | 65 |
| 5 🟡 | **Mua sắm** | Hỏi giá, hỏi size/màu, mặc cả, đổi trả | `/ʃ/` vs `/s/` (shop/sop); trọng âm từ | 60 |
| 6 🟡 | **Hỏi đường & phương hướng** | Hỏi đường, hiểu chỉ dẫn trái/phải/thẳng, hỏi lại | Ngữ điệu câu hỏi lên/xuống | 65 |
| 7 🟡 | **Gọi taxi / Grab / xe công nghệ** | Nói địa chỉ, hỏi giá, yêu cầu dừng, phàn nàn nhẹ | Nối âm (linking): `pick_up`, `get_off` | 60 |
| 8 🟡 | **Thời tiết, sức khoẻ, small talk** + **ÔN TẬP** | Chào hỏi xã giao, nói mình khoẻ/mệt, bình luận thời tiết | Ôn 12 âm khó + nhịp câu | 65 |

**Tổng giai đoạn 1: 500 từ/cụm.**

### Giai đoạn 2 — Tuần 9–17

| Tuần | Tình huống | Mục tiêu giao tiếp cụ thể | Kỹ năng mới | Từ mới |
|---|---|---|---|---|
| 9 🟡 | **Nhà hàng nâng cao** | Đặt bàn, hỏi thành phần món, yêu cầu đặc biệt (không cay, dị ứng), khiếu nại món sai, chia bill | **Bộ câu cứu hộ** | 45 |
| 10 🟡 | **Quán cà phê & đặt chỗ qua điện thoại** | Order đồ uống tuỳ chỉnh, đặt bàn qua điện thoại (không nhìn mặt) | Nghe không có hình ảnh hỗ trợ | 45 |
| 11 🟡 | **Khách sạn** | Check-in/out, yêu cầu dịch vụ, báo sự cố phòng, đổi phòng | Câu lịch sự gián tiếp | 50 |
| 12 🔴 | **Sân bay & máy bay** | Check-in, gửi hành lý, qua hải quan, transit, **mất hành lý** | Nghe thông báo loa (nhiễu, nhanh) | 55 |
| 13 🔴 | **Đi khám bệnh & hiệu thuốc** | Mô tả triệu chứng, vị trí đau, tiền sử bệnh, mua thuốc, hiểu liều dùng | Từ vựng cơ thể; **độ chính xác sống còn** | 55 |
| 14 🟡 | **Ngân hàng, bưu điện, hành chính** | Mở tài khoản, đổi tiền, gửi bưu kiện, điền form, hỏi thủ tục | Nghe con số dài, đánh vần tên | 45 |
| 15 🟡 | **Hàng xóm nước ngoài & giao tiếp xã hội** | Làm quen, mời sang chơi, nhờ vả nhỏ, từ chối lịch sự, small talk kéo dài 2 phút | **Duy trì hội thoại**, không để chết mạch | 45 |
| 16 🔴 | **Gọi điện công việc** | Nghe/gọi điện, giới thiệu bản thân, để lại tin nhắn, hẹn lịch, xử lý khi nghe không rõ | Nghe qua điện thoại (chất lượng kém) | 50 |
| 17 🔴 | **ÔN TẬP: Một ngày du lịch trọn vẹn** | Chuỗi liên hoàn: sân bay → taxi → khách sạn → hỏi đường → nhà hàng → mua sắm | Chuyển tình huống liên tục | 30 |

**Tổng giai đoạn 2: ~420 từ/cụm (luỹ kế ~920).**

### Giai đoạn 3 — Tuần 18–26

| Tuần | Tình huống | Mục tiêu giao tiếp cụ thể | Áp lực thêm vào | Từ mới |
|---|---|---|---|---|
| 18 🔴 | **Họp online — cơ bản** | Vào họp, giới thiệu, xin nhắc lại, xin phát biểu, báo cáo tiến độ ngắn | Giới hạn đáp 8s | 45 |
| 19 🔴 | **Họp online — nâng cao** | Nêu ý kiến, bất đồng lịch sự, đề xuất, chốt hành động, xử lý khi bị hỏi bất ngờ | Giới hạn 6s + accent Ấn Độ | 45 |
| 20 🔴 | **Phỏng vấn xin việc — phần 1** | Tell me about yourself, kinh nghiệm, điểm mạnh/yếu, tại sao ứng tuyển | Giới hạn 6s + không gợi ý | 50 |
| 21 🔴 | **Phỏng vấn xin việc — phần 2** | Câu hỏi tình huống, xử lý câu khó, đàm phán lương, đặt câu hỏi ngược | Giới hạn 5s + phỏng vấn viên "lạnh" | 50 |
| 22 🔴 | **Khiếu nại, đàm phán, thuyết phục** | Phàn nàn dịch vụ, đòi hoàn tiền, thương lượng giá, giữ bình tĩnh khi bị từ chối | Đối phương phản đối 2 lần | 45 |
| 23 🔴 | **Tình huống khẩn cấp** | Gọi cấp cứu, báo tai nạn, mất hộ chiếu/ví, trình báo cảnh sát, hỏi bệnh viện | Giới hạn 3s + audio nhiễu | 45 |
| 24 🔴 | **Giao tiếp xã hội chiều sâu** | Kể một câu chuyện 2 phút, nêu quan điểm, tranh luận nhẹ, hài hước, chia sẻ cảm xúc | Hội thoại mở, không kịch bản | 40 |
| 25 🔴 | **Accent Gauntlet** | Cùng 5 tình huống cũ, 5 giọng khác nhau: Ấn, Anh-Anh, Úc, Philippines, Mỹ miền Nam | Tốc độ 1.15×, không phụ đề | 20 |
| 26 🏁 | **Tổng duyệt & Test C** | Phỏng vấn mô phỏng 5 phút + 1 tình huống bốc ngẫu nhiên từ 25 tuần trước | Toàn bộ áp lực cộng dồn | 0 |

**Tổng giai đoạn 3: ~340 từ/cụm (luỹ kế ~1.260).**

### Tình huống dự phòng (dùng cho Track D hoặc học viên muốn học tiếp)

Lái xe & cảnh sát giao thông · Thuê nhà & làm việc với chủ nhà · Họp phụ huynh
trường quốc tế · Đi nhà thờ/chùa & sự kiện cộng đồng · Chăm sóc khách hàng qua
chat · Thuyết trình 5 phút · Đám cưới/tang lễ & nghi thức xã giao · Bảo hiểm &
y tế phức tạp

---

## 8. Hệ từ vựng & thuật toán SRS

### 8.1 Nguyên tắc chọn từ

Chọn theo **tần suất trong lời nói thực** giao với **tình huống của tuần**, không
theo danh sách từ vựng học thuật.

**Đơn vị lưu trữ là cụm, không phải từ.** So sánh:

| ❌ Không làm | ✅ Làm |
|---|---|
| `expensive = đắt` | `That's too expensive. Can you lower the price?` — kèm audio, ảnh chợ, ngữ cảnh tuần 5 |
| `appointment = cuộc hẹn` | `I'd like to make an appointment.` — audio, tình huống phòng khám |

Lý do: người học không cần nhớ nghĩa từ, họ cần **bật ra được cả cụm trong 1 giây**.

### 8.2 Cấu trúc 500 từ lõi (giai đoạn 1)

| Nhóm | Số lượng | Ví dụ |
|---|---|---|
| Động từ hành động cao tần | 80 | go, get, take, want, need, make, give, come, say, put... |
| Danh từ đời sống | 120 | water, money, house, food, doctor, bus, phone, room... |
| Tính từ mô tả | 50 | big, hot, cheap, tired, busy, good, wrong, ready... |
| Từ chức năng | 60 | this, that, here, there, now, later, but, because, if... |
| Số/thời gian/đơn vị | 40 | numbers, days, months, o'clock, minute, kilo, dollar... |
| **Cụm cố định (chunk)** | **100** | `How much is it?`, `I'd like...`, `Can I have...?`, `Where is...?`, `I don't understand.` |
| Từ theo tình huống tuần | 50 | riêng cho 8 tình huống của giai đoạn 1 |

> 100 cụm cố định là phần **giá trị cao nhất** của cả 500 từ. Một người nói được
> 100 cụm này trôi chảy sẽ giao tiếp tốt hơn người biết 1.000 từ rời.

### 8.3 Thuật toán SRS

Dùng **FSRS** (Free Spaced Repetition Scheduler) thay vì SM-2 cổ điển — ít thẻ ôn
hơn với cùng tỉ lệ nhớ, quan trọng khi ngân sách chỉ có 10 phút/ngày.

**Tuỳ biến riêng cho app này:**

| Tuỳ biến | Chi tiết | Lý do |
|---|---|---|
| **Mục tiêu retention** | 0.88 (mặc định 0.9) | Giảm nhẹ để cắt số thẻ ôn, tránh nản |
| **Trần thẻ/ngày** | Tối đa 28 thẻ (8 mới + 20 ôn) | 10 phút là 10 phút. Thẻ vượt trần đẩy sang hôm sau, ưu tiên thẻ nào sắp quên nhất |
| **Chấm điểm bằng giọng nói** | Grade tự động từ điểm phát âm + độ trễ, không để người học tự bấm "Easy/Hard" | Người học tự đánh giá không chính xác, và bấm nút phá nhịp nói |
| **Thẻ hai chiều** | Nhận biết (nghe→hiểu) và Sản sinh (Việt→nói Anh) là **2 thẻ riêng** với lịch riêng | Sản sinh khó hơn nhiều, cần ôn dày hơn |
| **Chèn theo tình huống** | Khi vào tuần có tình huống liên quan, kéo thẻ cũ liên quan lên sớm | Ôn tập có ngữ cảnh > ôn tập ngẫu nhiên |
| **Chế độ hồi phục** | Nghỉ > 3 ngày: không đổ hết thẻ quá hạn cùng lúc, giãn ra 5 ngày, tối đa +6 thẻ/ngày | **Chống "núi thẻ" — nguyên nhân bỏ app số 1 sau khi nghỉ dài** |

**Thang grade tự động:**

```
Again (1)  →  không nói được, hoặc trễ > 8s
Hard  (2)  →  nói được nhưng trễ 4–8s, hoặc phát âm < 60
Good  (3)  →  trễ 1.5–4s, phát âm 60–85
Easy  (4)  →  trễ < 1.5s, phát âm > 85
```

### 8.4 Vòng đời một thẻ

```
[Mới] → gặp trong bài Nghe/Nói → [Học] 3 lần trong ngày đầu
      → [Ôn] theo lịch FSRS
      → gặp lại trong tình huống thật ở buổi role-play → nâng độ bền
      → [Thuộc] khi nói ra được < 1.5s trong 3 lần liên tiếp cách nhau > 21 ngày
      → đưa vào "kho câu của tôi" (người học xem lại được, tự hào được)
```

---

## 9. Giáo trình phát âm cho người Việt

Đây là phần các app quốc tế làm kém nhất vì họ không thiết kế riêng cho tiếng Việt.
Đây nên là **lợi thế cạnh tranh** của app này.

### 9.1 Mười hai lỗi đặc trưng — thứ tự ưu tiên sửa

| # | Lỗi | Biểu hiện | Tuần dạy | Mức nghiêm trọng |
|---|---|---|---|---|
| 1 | **Nuốt phụ âm cuối** | `like` → "lai", `bad` → "bét" | 1 | 🔴 Phá nghĩa nặng nhất |
| 2 | **Bỏ đuôi -s / -es** | `two books` → "two book" | 3 | 🔴 |
| 3 | **Bỏ đuôi -ed** | `worked` → "work" | 3 | 🔴 |
| 4 | **`/θ/ /ð/` → `/t/ /d/`** | `think` → "tink", `this` → "dis" | 2 | 🟡 |
| 5 | **Cụm phụ âm bị tách/rụng** | `street` → "sờ-trít", `desks` → "đét" | 4 | 🔴 |
| 6 | **`/s/ /ʃ/ /tʃ/` lẫn lộn** | `she` → "si", `watch` → "oát" | 5 | 🟡 |
| 7 | **Sai trọng âm từ** | `phoTOgraph` thay vì `PHOtograph` | 5 | 🔴 Người nghe không nhận ra từ |
| 8 | **Nhịp đều như tiếng Việt** | Mọi âm tiết dài bằng nhau, không có âm yếu | 6 | 🔴 Lỗi làm người nghe mệt nhất |
| 9 | **Không nối âm** | `pick it up` đọc rời 3 khối | 7 | 🟡 |
| 10 | **`/l/` cuối → `/n/` hoặc rụng** | `call` → "co" | 7 | 🟡 |
| 11 | **Nguyên âm dài/ngắn không phân biệt** | `ship`/`sheep`, `full`/`fool` | 6 | 🟡 |
| 12 | **Ngữ điệu phẳng** | Câu hỏi không lên giọng, nghe như ra lệnh | 8 | 🟡 Ảnh hưởng thái độ |

### 9.2 Cách dạy mỗi lỗi (khuôn mẫu 5 bước, 3 phút/buổi)

```
1. NGHE PHÂN BIỆT (30s) — 6 cặp tối thiểu, chọn cái nào vừa nghe: bad/bat, ship/sheep
2. XEM CÁCH ĐẶT LƯỠI (20s) — animation mặt cắt miệng, không phải chữ giải thích
3. NÓI ĐƠN LẺ (40s) — 8 từ chứa âm đó, chấm từng từ
4. NÓI TRONG CÂU (60s) — 4 câu thật lấy từ tình huống của tuần
5. BẪY KIỂM TRA (30s) — 3 từ trộn lẫn, có 1 từ dễ sai; sai thì lặp lại bước 3
```

**Quan trọng:** mỗi âm đã dạy sẽ **quay lại kiểm tra ngẫu nhiên suốt 6 tháng**
trong khối shadowing, không dạy xong là bỏ. Phát âm là kỹ năng vận động, cần lặp
lại giãn cách y như từ vựng.

### 9.3 Hiển thị phản hồi

- **Không dùng số điểm trần trụi ở giai đoạn 1** — dùng 3 mức: `Chuẩn rồi` /
  `Gần đúng` / `Nghe lại nhé`. Điểm số chi tiết chỉ mở từ giai đoạn 2 trở đi, khi
  người học đã đủ tự tin để không bị nản.
- **Luôn có nút "nghe lại giọng của tôi cạnh giọng mẫu"** — hai sóng âm chồng lên
  nhau. Đây là cơ chế tự sửa hiệu quả nhất và người lớn rất thích.
- **Không bao giờ chặn tiến độ vì phát âm chưa đạt.** Đánh dấu để ôn lại, cho đi tiếp.

---

## 10. Cơ chế Streak & động lực

### 10.1 Vấn đề với streak kiểu Duolingo

Streak khắt khe tạo động lực cho 30 ngày đầu rồi trở thành nguồn tội lỗi. Với
người học lớn tuổi, mất streak 60 ngày vì một hôm đi đám cưới thường dẫn thẳng
tới bỏ app. Thiết kế dưới đây ưu tiên **duy trì hành vi dài hạn hơn là ép buộc
hàng ngày**.

### 10.2 Ba tầng "hoàn thành"

Không phải chỉ có làm/không làm. Có ba mức, cả ba đều **giữ streak**:

| Mức | Điều kiện | Streak | Ghi nhận |
|---|---|---|---|
| 🔥 **Buổi đầy đủ** | Xong cả 4 khối (~45 phút) | +1 | Đầy đủ điểm & tiến độ |
| ⭐ **Buổi rút gọn** | 15 phút: SRS + 1 role-play ngắn | +1 | Tiến độ chậm hơn, streak vẫn liền |
| 🌙 **Buổi tối thiểu** | 5 phút: chỉ ôn 10 thẻ SRS | +1 | Chỉ giữ trí nhớ, không có nội dung mới |

> Đây là cơ chế quan trọng nhất mục này. Người bận/mệt vẫn có đường thoát danh
> dự 5 phút thay vì bỏ luôn. **Ngày 5 phút vẫn tốt hơn ngày số 0 gấp nhiều lần**,
> vì thứ đang được bảo vệ là thói quen, không phải kiến thức.

### 10.3 Đóng băng streak (Streak Freeze)

| Quy tắc | Chi tiết |
|---|---|
| Số lượng | **2 lần/tháng**, cấp tự động vào ngày 1 hằng tháng |
| Cách dùng | **Tự động áp dụng**, không cần bấm gì. Sáng hôm sau app báo nhẹ nhàng: *"Hôm qua bạn nghỉ — đã dùng 1 ngày đóng băng. Còn 1 ngày trong tháng này. Chuỗi 47 ngày vẫn nguyên."* |
| Cộng dồn | Không dùng thì không cộng dồn sang tháng sau (tránh tích trữ rồi nghỉ 1 tuần liền) |
| Hết băng | Streak về 0 nhưng **"Kỷ lục cá nhân" được lưu vĩnh viễn** và hiển thị cạnh streak hiện tại |

### 10.4 Các van an toàn khác

| Cơ chế | Mô tả |
|---|---|
| **Chủ nhật miễn phí** | Chủ nhật chỉ cần buổi tối thiểu 15 phút là đủ giữ streak — được thông báo trước như một phần thưởng, không phải kẽ hở |
| **Chế độ nghỉ phép** | Báo trước ("tôi đi du lịch 5 ngày") → streak tạm dừng, không mất. Tối đa 2 lần/6 tháng, mỗi lần ≤ 10 ngày |
| **Chuộc chuỗi** | Mất streak? Làm 2 buổi đầy đủ trong 3 ngày kế tiếp → khôi phục. Dùng được 1 lần/tháng |
| **Streak tuần** | Chỉ tiêu **5/7 ngày mỗi tuần**. Đủ 5 ngày là tuần đó "xanh" bất kể nghỉ hôm nào |
| **Không nhắc kiểu doạ** | Cấm tuyệt đối các thông báo kiểu "Chuỗi 47 ngày của bạn sắp mất!". Thay bằng: *"Còn 5 phút hôm nay không? Chỉ 10 thẻ thôi."* |

### 10.5 Động lực không dựa vào streak

Streak chỉ là một chân. Ba chân còn lại quan trọng hơn về lâu dài:

1. **Nhật ký giọng nói.** Mỗi buổi lưu 1 đoạn ghi âm 20 giây. Cuối mỗi tháng, app
   tự ghép "Bạn tháng 1 vs Bạn tháng này" cho nghe cạnh nhau. Đây là bằng chứng
   tiến bộ mạnh nhất mà không con số nào thay được — và là thứ người học sẽ khoe
   với gia đình.

2. **Bảng "Việc tôi làm được".** Không đếm từ, đếm **năng lực**:
   > ✅ Gọi món trong nhà hàng · ✅ Hỏi đường · ✅ Đặt phòng khách sạn ·
   > 🔒 Đi khám bệnh (tuần 13) · 🔒 Phỏng vấn xin việc (tuần 20)

3. **Thử thách đời thật (từ tuần 9).** Mỗi 2 tuần một nhiệm vụ ngoài app: xem một
   video YouTube không phụ đề, gọi hotline tiếng Anh của một khách sạn để hỏi
   giá, bắt chuyện với một người nước ngoài. Đánh dấu hoàn thành thủ công. Đây là
   cầu nối app → đời thật, thiếu nó thì mọi app đều dừng ở "biết mà không dám".

### 10.6 Báo cáo tuần (Chủ nhật, 1 màn hình)

```
TUẦN 12 · Sân bay & máy bay

Bạn học 6/7 ngày  ·  Chuỗi: 47 ngày 🔥

⚡ Phản xạ:    3.2s  →  2.6s     (nhanh hơn 0.6s so với tuần trước)
🗣️ Phát âm:    74    →  78
📚 Từ thuộc:   612   →  667      (+55)
🎧 Nghe được:  1.0×  (giữ nguyên)

Bạn nói được câu dài nhất tuần này:
  "Excuse me, I think my bag didn't come out. Where can I report it?"
  ▶ Nghe lại

Tuần tới: Đi khám bệnh — tình huống khó, nhiều từ mới.
```

---

## 11. Đánh giá định kỳ & tái phân lộ trình

| Thời điểm | Tên | Thời lượng | Nội dung | Hệ quả |
|---|---|---|---|---|
| Trước tuần 1 | Placement | 7 phút | Mục 4 | Gán track |
| Cuối tuần 2 | Kiểm tra ngầm | 0 (cài lẫn) | 2 câu thăm dò/tuần | Tinh chỉnh độ khó |
| Cuối tuần 4 | Soi lại lộ trình | 5 phút | Rút gọn từ placement | Đổi track nếu lệch |
| **Cuối tuần 8** | **Test A** | 15 phút | Phát âm 20 câu + nghe 15 câu + nói 5 câu | Vào giai đoạn 2 / kéo dài GĐ1 2 tuần |
| Cuối tuần 12 | Kiểm tra giữa kỳ | 10 phút | 2 role-play | Điều chỉnh tốc độ audio |
| **Cuối tuần 17** | **Test B** | 20 phút | 3 role-play ngẫu nhiên, không gợi ý | Vào giai đoạn 3 / bổ sung |
| Cuối tuần 22 | Thử áp lực | 10 phút | 1 phỏng vấn mô phỏng | Chỉnh giới hạn thời gian đáp |
| **Cuối tuần 26** | **Test C** | 30 phút | Phỏng vấn 5' + tình huống bốc ngẫu nhiên + đối chiếu nhật ký giọng nói tháng 1 | Cấp báo cáo tổng kết + lộ trình duy trì |

**Quy tắc vàng:** không bao giờ hiển thị kết quả test dưới dạng "đạt/trượt".
Luôn hiển thị dạng **"trước → sau"** và **"việc mới bạn làm được"**.

---

## 12. Kiến trúc hội thoại lai & ngân sách LLM

> **Quyết định của bạn (đã chốt):** kịch bản cố định cho phần lõi 45 phút/ngày; LLM chỉ
> dùng cho role-play tự do ngắn cuối buổi và cuối tuần, có giới hạn số lượt gọi/ngày.

### 12.1 Hai vùng, ranh giới rõ ràng

| | **Vùng A — Kịch bản cố định** | **Vùng B — LLM** |
|---|---|---|
| **Dùng ở đâu** | Toàn bộ 4 khối của buổi học chuẩn (SRS, Nghe, Shadowing, Ôn nhanh) + role-play có kịch bản của tuần | "Nói tự do" 5 phút cuối buổi (tuỳ chọn) + buổi thực chiến thứ 7 |
| **Cách hoạt động** | Cây quyết định: mỗi lượt của app có 3–5 nhánh trả lời tuỳ theo ý định người học | Model sinh lời thoại theo system prompt ràng buộc vai + trình độ |
| **Chi phí** | **0đ** | Theo lượt gọi (mục 12.3) |
| **Hoạt động offline** | Có | Không |
| **Tỉ lệ thời lượng** | ~90% | ~10% |

**Nguyên tắc bất di bất dịch: Vùng B không bao giờ chặn tiến độ.** Hết quota, mất mạng,
API lỗi — buổi học vẫn hoàn thành đủ 4 khối và vẫn tính streak. Người học chỉ thấy dòng
chữ *"Phần nói tự do hôm nay đã dùng hết. Mai gặp lại nhé."* — không có màn hình lỗi.

### 12.2 Nhận diện ý định (intent) — cái làm Vùng A không nhàm

Kịch bản cố định chỉ chán khi nó khớp câu theo chuỗi ký tự. Thay vào đó:

```
Người học nói → ASR ra text → phân loại ý định (on-device, không tốn tiền)
                                    ↓
        ┌───────────────┬───────────────┬───────────────┬──────────────┐
     Đúng ý          Gần đúng        Sai ý          Câu cứu hộ      Im lặng
   → nhánh chính   → nhánh chính    → nhánh sửa   → app nói chậm   → gợi ý
                     + ghi nhận       nhẹ nhàng      lại 1 lần        sau 8s
```

Phân loại ý định dùng danh sách từ khoá + đối chiếu mẫu câu của tuần, chạy ngay trên máy.
Với 130 kịch bản × ~5 nhánh/lượt, người học không cảm thấy lặp trong 6 tháng.

### 12.3 Ngân sách LLM — con số thật

**Ước lượng một lượt role-play tự do:**

| Thành phần | Token |
|---|---|
| System prompt (vai diễn + ràng buộc trình độ + độ dài câu) | ~700 |
| Lịch sử hội thoại (6–10 lượt, cắt cửa sổ trượt) | ~500 |
| **Tổng input/lượt** | **~1.200** |
| Output/lượt (câu trả lời ngắn của "nhân vật") | ~60 |

**Chi phí theo model** (giá công bố, USD/1 triệu token):

| Model | Input | Output | Chi phí/lượt | Ghi chú |
|---|---|---|---|---|
| **Claude Haiku 4.5** (`claude-haiku-4-5`) | $1,00 | $5,00 | **~$0,0015** (~39đ) | Rẻ nhất trong dòng Claude, chất lượng ổn cho hội thoại ngắn |
| Claude Sonnet 5 | $3,00 | $15,00 | ~$0,0045 (~117đ) | Chỉ cân nhắc nếu Haiku diễn vai quá cứng |
| Gemini Flash (free tier) | 0 | 0 | 0đ | Xem cảnh báo bên dưới |

**Quota đề xuất và tổng chi phí (Haiku 4.5):**

| Hạng mục | Số lượt/ngày/người | Ghi chú |
|---|---|---|
| Nói tự do cuối buổi (T2–T6) | 12 | Đủ cho 5 phút hội thoại |
| Buổi thực chiến thứ 7 | 40 | Role-play dài 15 phút |
| **Trần cứng/ngày/người** | **45** | Vượt trần → chuyển về kịch bản cố định |

```
Trường hợp xấu nhất: 2 người × 45 lượt × 30 ngày = 2.700 lượt/tháng
                     2.700 × $0,0015 = $4,05/tháng  ≈  105.000đ/tháng

Thực tế (T2–T6 dùng 12, T7 dùng 40, CN 0):
                     2 người × ~100 lượt/tuần × 4,3 tuần = ~860 lượt/tháng
                     ≈ $1,30/tháng  ≈  34.000đ/tháng
```

> **Kết luận:** ở quy mô 2 người, chi phí LLM không phải là vấn đề cần tối ưu. Trần cứng
> 45 lượt/ngày/người tồn tại để **chống sự cố** (bug vòng lặp gọi API, con nghịch app),
> không phải để tiết kiệm tiền.

### 12.4 Về prompt caching — không áp dụng được ở đây

Bạn có thể nghĩ tới việc cache system prompt để giảm giá (cache read chỉ ~0,1× giá gốc).
Nhưng **Haiku 4.5 yêu cầu prefix tối thiểu 4.096 token mới cache được**, trong khi system
prompt của ta chỉ ~700 token. Cache sẽ im lặng không hoạt động — không báo lỗi, chỉ là
`cache_creation_input_tokens = 0`.

Đừng nhồi prompt cho đủ 4.096 token để ép cache: cache write tốn 1,25× giá gốc, tức là
bạn trả nhiều hơn để tiết kiệm ít hơn. **Bỏ qua caching ở phiên bản này.**

### 12.5 Về Gemini Flash free tier — cảnh báo cần cân nhắc

Bạn nhắc tới ưu tiên free tier. Có ba điểm cần biết trước khi quyết:

1. **Dữ liệu free tier thường được dùng để cải thiện sản phẩm.** Nghĩa là lời thoại tiếng
   Anh của ba bạn trong lúc luyện tập có thể được xử lý ngoài phạm vi riêng tư. Với app
   gia đình, đây là điều bạn nên biết chứ không phải điều tôi tự quyết thay bạn.
2. **Rate limit của free tier thay đổi không báo trước.** App có thể bị chặn ngay giữa
   buổi học của ba bạn — đúng lúc tệ nhất.
3. **Khoản tiết kiệm là ~34.000đ/tháng.** Ở mức đó, đánh đổi lấy rủi ro (1) và (2) là
   không đáng, cho một app mà mục tiêu là ba bạn học đều 6 tháng không nản.

**Đề xuất của tôi:** dùng **Haiku 4.5 làm mặc định**, chi phí thực tế ~34.000đ/tháng.

**Nhưng thiết kế provider-agnostic** để bạn đổi ý lúc nào cũng được:

```
interface ConversationProvider {
    reply(systemPrompt, history, userUtterance) -> { text, latencyMs, tokensUsed }
}
    ├── ClaudeProvider     (claude-haiku-4-5)   ← mặc định
    ├── GeminiProvider     (flash, free tier)   ← bật bằng config
    └── ScriptedProvider   (cây quyết định)     ← fallback khi 2 cái trên fail
```

Đổi provider = đổi 1 dòng config, không đụng vào logic bài học. Tầng `ScriptedProvider`
là thứ đảm bảo nguyên tắc "Vùng B không bao giờ chặn tiến độ" ở mục 12.1.

**Trong app không có màn hình nhập API key.** Key nằm ở phía server, bạn cấu hình một lần
lúc dựng app. Ba bạn không bao giờ nhìn thấy nó, không phải đăng ký gì với nhà cung cấp AI,
không phải nhập gì cả — chỉ mở app và học. Hoá đơn ~34.000đ/tháng về phía bạn.

Hệ quả kỹ thuật: app **không gọi thẳng** tới nhà cung cấp AI. Mọi lượt role-play đi qua
một backend nhỏ của bạn, nơi giữ key và đếm quota 45 lượt/ngày/tài khoản. Nếu app gọi
thẳng, key sẽ phải nằm trong app và bất kỳ ai cũng trích được ra dùng miễn phí bằng tiền
của bạn.

### 12.6 Ràng buộc system prompt cho role-play

Model dễ nói quá dài và quá khó so với trình độ người học. Ba ràng buộc bắt buộc:

| Ràng buộc | Chi tiết |
|---|---|
| **Độ dài** | Giai đoạn 1: tối đa 12 từ/lượt. GĐ2: 20 từ. GĐ3: tự nhiên, không giới hạn |
| **Vốn từ** | Chỉ dùng từ đã dạy + 10% từ mới có thể đoán từ ngữ cảnh |
| **Vai diễn** | Bám mục tiêu giao tiếp của tuần, không lái sang chủ đề khác, không dạy ngữ pháp |
| **Không bao giờ** | Không chuyển sang tiếng Việt; không khen sáo rỗng ("Great job!") sau mỗi câu |

Ràng buộc độ dài phải kiểm tra **ở phía app** sau khi nhận kết quả, không chỉ ghi trong
prompt — nếu vượt quá, cắt ở câu hoàn chỉnh gần nhất.

### 12.7 Ranh giới online / offline

> **Quyết định:** chấm phát âm chạy **trên server**, mọi thứ còn lại chạy được offline.

Chấm phát âm chuẩn cần model phoneme nặng. Làm trên máy thì vừa khó, vừa kém chính xác —
mà "chấm phát âm sai → người học mất niềm tin" là rủi ro 🔴 Cao ở mục 15. Thà cần mạng
còn hơn chấm sai.

| Chức năng | Cần mạng? | Khi mất mạng |
|---|---|---|
| Khối 1 — SRS từ vựng | Không | Chạy bình thường (thẻ + audio đã tải sẵn) |
| Khối 2 — Nghe | Không | Chạy bình thường (audio tải trước theo tuần) |
| Khối 3 — Shadowing | **Có** (chấm điểm) | Vẫn ghi âm được, xem mục "hàng đợi" bên dưới |
| Khối 3 — Role-play kịch bản | Không | Chạy bình thường |
| Khối 3 — Nói tự do (LLM) | **Có** | Chuyển sang role-play kịch bản |
| Khối 4 — Ôn nhanh | Không | Chạy bình thường |

**Hàng đợi chấm phát âm.** Mất mạng giữa khối Shadowing thì app **không báo lỗi và không
dừng bài**. Nó ghi âm, xếp vào hàng đợi, và hiển thị:

> *"Đã ghi lại. App sẽ chấm khi có mạng."*

Người học học tiếp bình thường. Có mạng trở lại, app chấm hàng đợi trong nền và cập nhật
điểm phát âm cùng danh sách âm cần sửa. Buổi học **tính hoàn thành và tính streak ngay**,
không chờ chấm xong.

**Tải trước nội dung.** Mỗi Chủ nhật, app tải sẵn toàn bộ audio + thẻ + kịch bản của tuần
kế tiếp khi có Wi-Fi. Ước tính ~80–120 MB/tuần. Nhờ vậy tuần học sau chạy được cả tuần
không cần mạng, trừ chấm phát âm và nói tự do.

---

## 13. Hai người dùng — hai lộ trình độc lập

> **Quyết định của bạn (đã chốt):** 2 tài khoản riêng — **Tài khoản 1** (ba bạn) và
> **Tài khoản 2** (bạn). Chạm chọn khi mở app, không đăng ký, không mật khẩu, không mã
> sao lưu. Tiến độ / nội dung / lộ trình độc lập hoàn toàn: không chung streak, không
> chung SRS.

### 13.1 Ranh giới dữ liệu

| Dùng chung (read-only) | Riêng từng tài khoản (read-write) |
|---|---|
| Thư viện nội dung: 1.300 thẻ từ vựng, 130 đoạn nghe, 130 kịch bản role-play, 12 module phát âm, 4 bộ test | Kết quả placement + track được gán |
| Định nghĩa 26 tuần & cấu trúc giai đoạn | Toàn bộ lịch SRS (mỗi thẻ có `due_date`, `stability`, `difficulty` riêng) |
| Bộ audio, ảnh, animation | Streak, ngày đóng băng còn lại, kỷ lục cá nhân |
| | Điểm phát âm theo từng âm, danh sách âm cần sửa |
| | Nhật ký giọng nói (file ghi âm) |
| | Bảng "việc tôi làm được", tiến độ tuần |
| | Quota LLM trong ngày (đếm riêng, không chia nhau) |
| | Tuỳ chọn hiển thị: cỡ chữ, tốc độ audio mặc định |

**Quy tắc:** mọi bảng dữ liệu học tập đều có khoá `user_id`. Thư viện nội dung là bảng
duy nhất không có khoá đó. Nếu một truy vấn nào đó không lọc theo `user_id`, đó là bug.

### 13.2 Chọn tài khoản — không có đăng nhập

> **Quyết định của bạn (đã chốt):** app dùng trong gia đình, chỉ 2 người. Không đăng ký,
> không mật khẩu, không mã sao lưu. Mở app → chạm chọn tài khoản → vào học.

**Hai tài khoản:**

| | Của ai | Trình độ |
|---|---|---|
| **Tài khoản 1** | Ba bạn | Sơ cấp A1–A2 (đã xác nhận) |
| **Tài khoản 2** | Bạn | Placement test quyết định |

**Màn hình đầu tiên khi mở app:**

```
        Hôm nay ai học?

   ┌──────────────┐  ┌──────────────┐
   │              │  │              │
   │      👤      │  │      👤      │
   │              │  │              │
   │  TÀI KHOẢN 1 │  │  TÀI KHOẢN 2 │
   │  🔥 47 ngày  │  │  🔥 12 ngày  │
   └──────────────┘  └──────────────┘
```

Quy tắc thiết kế:

- **Hai ô lớn, chạm một lần là vào.** Không màn hình trung gian, không "xác nhận".
- **Nhớ tài khoản lần trước.** Mở lại app trong cùng ngày → vào thẳng tài khoản đó, bỏ qua
  màn hình chọn. Nút "Đổi tài khoản" nhỏ ở góc màn hình chính để quay lại.
- **Đổi tài khoản giữa chừng không mất dữ liệu.** Buổi học dở được lưu lại đúng vị trí;
  quay lại là học tiếp, không phải làm lại từ đầu.
- **Hiển thị streak ngay trên ô chọn.** Đây là thứ đầu tiên ba bạn nhìn thấy mỗi ngày —
  dùng nó làm động lực.
- **Không có khái niệm "đăng xuất".** Không màn hình cài đặt tài khoản, không mật khẩu,
  không email, không mã khôi phục.

**Về kỹ thuật:** khoá `user_id` ở mục 13.1 vẫn giữ nguyên — chỉ khác là nó được gán cứng
cho hai tài khoản lúc cài app, và không có tầng xác thực nào phía trên. Ranh giới dữ liệu
giữa hai tài khoản không đổi.

### 13.2b Không sao lưu — rủi ro đã chấp nhận

> **Quyết định của bạn (đã chốt):** không mã sao lưu, không khôi phục.

Dữ liệu nằm hoàn toàn trên máy. **Mất máy hoặc gỡ app là mất hết**: 6 tháng tiến độ, toàn
bộ lịch SRS, và toàn bộ nhật ký giọng nói.

Đây là đánh đổi có ý thức để app thật đơn giản, và tôi tôn trọng quyết định đó. Nhưng có
một việc **miễn phí, không thêm màn hình nào, không cần ai nhớ gì** mà tôi đề xuất làm
ngay từ v1: **để hệ điều hành tự sao lưu app**.

#### iOS — không có "cờ", chỉ có chọn đúng thư mục

Trên iOS, iCloud Backup **mặc định đã bao gồm dữ liệu app**. Không có cờ nào để bật. Việc
duy nhất lập trình viên phải làm là **đặt file đúng thư mục**, vì iOS quyết định sao lưu
hay không dựa trên vị trí file:

| Thư mục | Có được sao lưu? | Đặt gì vào đây |
|---|---|---|
| `Documents/` | ✅ Có | Nhật ký giọng nói (do người dùng tạo ra, không tái tạo được) |
| `Library/Application Support/` | ✅ Có | Database SQLite: lịch SRS, streak, tiến độ, điểm phát âm |
| `Library/Caches/` | ❌ Không | **Nội dung tải trước hằng tuần** (audio, ảnh, kịch bản) |
| `tmp/` | ❌ Không | File tạm khi ghi âm |

> ⚠️ **Cái bẫy quan trọng nhất — đừng để nội dung tải trước vào `Documents/`.** Mục 12.7
> tải trước ~80–120 MB/tuần. Sau 6 tháng là ~2–3 GB. Nếu số đó nằm trong `Documents/`, nó
> sẽ được đẩy hết lên iCloud, làm đầy 5 GB miễn phí của ba bạn, khiến **iCloud Backup âm
> thầm ngừng chạy** — và anh mất dữ liệu đúng như khi không sao lưu gì cả, chỉ khác là anh
> tưởng mình có. Apple cũng có thể từ chối app vì lý do này khi duyệt App Store.
>
> Nội dung tải trước là thứ **tải lại được**, nên chỗ đúng của nó là `Library/Caches/`.

Nếu vì lý do nào đó phải để file tải lại được trong `Documents/`, đánh dấu loại trừ:

```swift
var url = contentFolderURL
var values = URLResourceValues()
values.isExcludedFromBackup = true
try url.setResourceValues(values)
```

Làm đúng như trên thì tổng dung lượng lên iCloud chỉ còn database + nhật ký giọng nói —
khoảng vài chục MB sau 6 tháng, nằm gọn trong 5 GB miễn phí.

**Phía người dùng phải bật iCloud Backup trên máy** (đây là cài đặt của iPhone, app không
can thiệp được): *Cài đặt → [tên tài khoản] → iCloud → Sao lưu iCloud → bật*. Máy iPhone
thường đã bật sẵn từ lúc thiết lập. Anh nên kiểm tra máy ba anh một lần lúc cài app.

#### Android — có cờ thật

Android thì đúng là một cờ trong `AndroidManifest.xml`:

```xml
<application android:allowBackup="true"
             android:dataExtractionRules="@xml/backup_rules">
```

`allowBackup` mặc định đã là `true`. Cái đáng làm là file `backup_rules` để loại trừ thư
mục nội dung tải trước — cùng lý do với iOS (Android Auto Backup giới hạn 25 MB/app, vượt
là ngừng sao lưu hoàn toàn, nên nếu không loại trừ thì gần như chắc chắn hỏng).

#### Giới hạn cần biết

Sao lưu hệ thống **không phải là đồng bộ**. Nó chỉ cứu được tình huống *đổi máy* hoặc
*khôi phục máy*. Nó **không** cứu được: gỡ app rồi cài lại trên cùng máy (iOS xoá dữ liệu
app khi gỡ), hay hai bố con muốn học trên hai máy khác nhau.

Nếu bạn thấy vậy là đủ thì không cần làm gì thêm — đây chỉ là chọn thư mục cho đúng lúc
code, không phải tính năng.

### 13.3 Hai tài khoản dự kiến

| | **Tài khoản 1** (ba bạn) | **Tài khoản 2** (bạn) |
|---|---|---|
| Trình độ | Sơ cấp A1–A2 (đã xác nhận) | Chưa biết — placement test quyết định |
| Track dự kiến | **Track C** (nén GĐ1 còn 5 tuần), khả năng cao có ghi đè lịch nghe sang Track B | Chưa xác định |
| Cỡ chữ mặc định | Lớn | Tiêu chuẩn |
| Tốc độ audio khởi điểm | 0,85× | Theo kết quả placement |

**Một hệ quả về nội dung bạn cần biết trước:** nếu bạn làm placement test và ra **Track D
(B1+)**, lộ trình của bạn sẽ bỏ qua tuần 1–8 và cần **8 tuần tình huống nâng cao** — hiện
mới chỉ là danh sách gạch đầu dòng ở cuối mục 7, chưa có kịch bản. Tức là bạn sẽ chạm
"đáy" nội dung vào khoảng tháng thứ 4.

Ba hướng xử lý, tôi khuyên hướng 1:

1. **Chấp nhận và sản xuất sau.** Ba bạn là người dùng chính; làm xong nội dung cho ba
   bạn trước, sản xuất 8 tuần nâng cao trong lúc ba bạn đang học tháng 2–3.
2. Bạn học chậm hơn mức track đề xuất, dùng chung nội dung với ba bạn.
3. Sản xuất đủ 34 tuần ngay từ đầu — tăng ~30% khối lượng nội dung ở mục 14.

### 13.4 Không chia sẻ tiến độ (mặc định)

Mặc định hai tài khoản **không nhìn thấy** streak, điểm số, hay tiến độ của nhau. Lý do:
người mới học rất dễ nản khi bị so sánh, và so sánh bố–con thì càng nhạy cảm.

Ở phiên bản sau, có thể cân nhắc một tính năng **opt-in một chiều**: gửi lời động viên
("Ba học 30 ngày liên tiếp rồi!") mà không kèm con số so sánh. Nhưng chỉ khi cả hai cùng
bật, và không đưa vào v1.

---

## 14. Bảng kê nội dung cần sản xuất

Ước lượng để bạn cân nhắc khối lượng trước khi duyệt.

| Loại nội dung | Số lượng | Ghi chú sản xuất |
|---|---|---|
| Thẻ từ vựng (cụm + câu + audio + ảnh) | ~1.300 | TTS chất lượng cao cho v1; giọng người thật cho 100 cụm lõi |
| Đoạn hội thoại nghe (60–90s) | 130 (5/tuần × 26) | Cần bản sạch + bản có tiếng ồn nền |
| Kịch bản role-play | 130 chính + ~40 nhánh lệch | Nhánh lệch dùng cho GĐ2–3 |
| Bài shadowing | 130 | Trích từ chính đoạn nghe, không viết riêng |
| Module phát âm | 12 (có animation miệng) | Tài sản dùng lại suốt khoá |
| Bộ audio đa giọng (tuần 25) | 5 giọng × 5 tình huống = 25 | Ưu tiên giọng người thật |
| Bài test (A/B/C + placement) | 4 bộ, mỗi bộ 2 biến thể | Biến thể để làm lại không bị thuộc |
| Thử thách đời thật | 9 | Chỉ là text + hướng dẫn |

**Ưu tiên nếu phải cắt để ra bản v1:** giữ nguyên placement test, 500 từ lõi,
12 module phát âm, và role-play của tuần 1–8. Phần accent gauntlet và nhánh lệch
kịch bản có thể đưa vào bản sau.

---

## 15. Rủi ro & những gì đã chốt

### Rủi ro đã nhận diện

| Rủi ro | Mức | Cách giảm thiểu đã thiết kế |
|---|---|---|
| Chấm phát âm sai → người học mất niềm tin | 🔴 Cao | Dùng 3 mức mô tả thay vì điểm số ở GĐ1; luôn cho nghe đối chiếu để tự phán đoán; không bao giờ chặn tiến độ |
| Bỏ cuộc ở tuần 3–5 (giai đoạn hết hứng mới) | 🔴 Cao | Buổi tối thiểu 5 phút; tuần 4 có tình huống gọi món — thứ ứng dụng được ngay |
| Nội dung nghe quá khó ở GĐ2 gây nản | 🟡 TB | Tự động hạ tốc độ khi 3 buổi liên tiếp < 60% |
| Role-play bằng LLM trả lời lệch vai hoặc quá dài | 🟡 TB | Ràng buộc system prompt (mục 12.6) **và** cắt độ dài ở phía app — không chỉ tin vào prompt |
| Vùng B (LLM) lỗi hoặc hết quota làm gãy buổi học | 🟡 TB | `ScriptedProvider` fallback (mục 12.5); buổi học vẫn đủ 4 khối, vẫn tính streak |
| Bạn chạm "đáy" nội dung ở tháng 4 nếu placement ra Track D | 🟡 TB | Mục 13.3 — sản xuất 8 tuần nâng cao trong lúc ba bạn đang học tháng 2–3 |
| **Mất máy = mất trắng 6 tháng tiến độ và nhật ký giọng nói** | 🔴 Cao | Không có cách giảm thiểu trong app (không sao lưu, theo quyết định #8). Chỉ có sao lưu hệ thống iOS/Android, và nó chỉ cứu được lúc đổi máy — mục 13.2b |
| 45 phút quá dài, thực tế chỉ trụ được 25 | 🟡 TB | Kiến trúc 4 khối cho phép cắt ngang bất cứ đâu mà vẫn có giá trị |

### Toàn bộ quyết định đã chốt

Không còn câu hỏi mở. Bạn đã yêu cầu tôi chọn phương án tối ưu cho những mục còn lại —
dưới đây là toàn bộ, kèm lý do. Mọi mục đều **đảo ngược được**, cột cuối ghi rõ chi phí
nếu bạn muốn đổi ý sau.

| # | Vấn đề | Quyết định | Vì sao | Đổi ý sau tốn gì |
|---|---|---|---|---|
| 1 | Giọng mẫu chính | **Anh-Mỹ** | Nhiều tài nguyên nhất, phổ biến nhất ở VN, và là giọng ba bạn sẽ gặp nhiều nhất trong phim/nhạc/công việc. Các giọng khác vẫn xuất hiện có chủ đích ở tuần 25 | Rẻ nếu đổi trước khi thu audio; đắt sau đó (phải làm lại 130 đoạn nghe) |
| 2 | Role-play | **Lai** — kịch bản cố định cho phần lõi, LLM cho nói tự do (mục 12) | Chi phí ~34.000đ/tháng, không bao giờ chặn tiến độ | Rẻ — interface `ConversationProvider` đã tách sẵn |
| 3 | Model LLM | **Claude Haiku 4.5**, key giữ ở server — app không có màn hình nhập key (mục 12.5) | Rẻ nhất dòng Claude, đủ tốt cho hội thoại ngắn; tránh rủi ro dữ liệu + rate limit của free tier (mục 12.5) | Rẻ — đổi 1 dòng config |
| 4 | Chấm phát âm | **Trên server**, có hàng đợi offline (mục 12.7) | Chấm phát âm chuẩn cần model nặng, làm trên máy vừa khó vừa kém chính xác — mà chấm sai là rủi ro 🔴 Cao ở bảng trên | Trung bình — kiến trúc hàng đợi giữ nguyên, chỉ thay engine |
| 5 | Kỹ năng viết | **Không dạy** | Mục tiêu là giao tiếp. Thêm viết sẽ lấy mất thời lượng của khối Nói — khối quan trọng nhất | Rẻ nếu thêm sau như khối tuỳ chọn ngoài 45 phút |
| 6 | Số người dùng | **2 tài khoản độc lập hoàn toàn** — TK1 ba bạn, TK2 bạn (mục 13) | Không chung streak, không chung SRS | Đắt nếu sau này muốn mở cho nhiều người (cần tài khoản thật) |
| 7 | Đăng nhập | **Không có.** Mở app → chạm chọn Tài khoản 1 / Tài khoản 2 (mục 13.2) | Bỏ hết ma sát cho người lớn tuổi | Trung bình — thêm đăng nhập sau cần di trú dữ liệu |
| 8 | Sao lưu | **Không có mã, không có khôi phục** (mục 13.2b). Chỉ dựa vào sao lưu hệ thống iOS/Android — là việc chọn đúng thư mục lúc code, không phải tính năng | Bạn chọn đơn giản tuyệt đối. Cờ hệ thống là thứ duy nhất không thêm màn hình nào mà vẫn đỡ được phần nào | Rẻ |
| 9 | Số máy | **Một máy chung.** Không đồng bộ nhiều máy | Không còn backend sao lưu thì đồng bộ 2 máy cũng không còn cơ sở | Đắt — muốn 2 máy thì phải dựng lại backend |
| 11 | Đóng gói & cài đặt | **PWA** — bạn cài một lần lên máy ba bạn, sau đó ba bạn chỉ chạm biểu tượng (mục 16) | 0đ, không duyệt Apple, không hết hạn, tự cập nhật. TestFlight hết hạn sau 90 ngày là đủ để ba bạn bỏ app giữa khoá | Rẻ — bọc vỏ native sau vẫn giữ nguyên code |
| 10 | Track D cho bạn | **Hướng 1** — ưu tiên nội dung cho ba bạn, sản xuất 8 tuần nâng cao trong lúc ba bạn học tháng 2–3 (mục 13.3) | Ba bạn là người dùng chính; đừng để việc chuẩn bị nội dung cho bạn làm chậm ngày ba bạn bắt đầu | Rẻ — chỉ là thứ tự sản xuất |

**Ba quyết định đáng để bạn soi lại kỹ nhất**, vì chúng đắt nhất nếu đổi:

- **#1 giọng Mỹ** — đổi sau khi đã thu xong audio là làm lại gần như toàn bộ thư viện nghe.
- **#4 chấm phát âm trên server** — đây là lý do app **cần mạng** ở khối Nói. Nếu chỗ ba
  bạn học mạng chập chờn, hàng đợi offline ở mục 12.7 sẽ gánh, nhưng phản hồi phát âm sẽ
  đến chậm thay vì tức thì.
- **#8 không sao lưu** — mất máy ở tháng thứ 5 là mất trắng 6 tháng tiến độ và toàn bộ
  nhật ký giọng nói. Đây là rủi ro lớn nhất còn lại trong toàn bộ thiết kế.
- **#6 + #7 không có đăng nhập** — nếu có ngày bạn muốn cho người ngoài gia đình dùng,
  đây là chỗ phải làm lại nhiều nhất.

Các mục còn lại đổi ý lúc nào cũng được mà gần như không tốn gì.

---

## 16. Đưa app tới máy ba bạn

> **Yêu cầu:** ba bạn chỉ cần **chạm vào biểu tượng là dùng được**. Không đăng nhập, không
> cài đặt, không hiểu gì về kỹ thuật.

Điều đầu tiên cần tách bạch: **"cài app" và "dùng app" là hai việc khác nhau.** Việc cài
chỉ xảy ra **một lần, và do bạn làm trên máy ba bạn** — ba bạn không tham gia. Từ hôm sau
trở đi, ba bạn chỉ thấy một biểu tượng trên màn hình chính, chạm vào là học.

Vậy câu hỏi thật không phải "làm sao ba tôi cài được app", mà là **"cách đóng gói nào để
bạn cài một lần rồi không bao giờ phải đụng lại nữa"**.

### 16.1 Ba cách đưa app lên iPhone

| | **PWA** (web app thêm vào màn hình chính) | **TestFlight** | **App Store công khai** |
|---|---|---|---|
| Ba bạn thấy gì | Biểu tượng trên màn hình chính, mở toàn màn hình — không phân biệt được với app thường | Như app thường | Như app thường |
| Chi phí | **0đ** | ~2,5 triệu/năm (Apple Developer) | ~2,5 triệu/năm |
| Duyệt của Apple | Không | Nhẹ | **Có, và có thể bị từ chối** |
| Hết hạn | Không bao giờ | **90 ngày/bản** — phải build lại, ba bạn phải bấm cập nhật | Không |
| Cập nhật | Tự động, ba bạn không biết gì | Ba bạn phải mở TestFlight bấm cập nhật | Qua App Store |
| Thời gian tới lúc chạy được | Ngay | Vài ngày | Vài tuần |

**Rủi ro của App Store công khai:** Apple thường từ chối app "làm cho một cá nhân hoặc
một nhóm nhỏ dùng nội bộ" (guideline về minimum functionality). App học tiếng Anh cho 2
bố con nhiều khả năng rơi vào diện này. Bỏ 2,5 triệu/năm và chờ vài tuần để rồi có thể bị
từ chối, trong khi mục tiêu chỉ là ba bạn học được — không đáng.

**Rủi ro của TestFlight:** bản build hết hạn sau 90 ngày. Nghĩa là **giữa khoá học 6
tháng, app của ba bạn sẽ ngừng hoạt động ít nhất một lần**, và ba bạn phải tự mở TestFlight
bấm cập nhật. Với người không rành công nghệ, đó là ngày họ bỏ app.

### 16.2 Quyết định: PWA

> **Chốt: đóng gói dạng PWA**, bạn cài một lần lên máy ba bạn.

Lý do quyết định được nhanh: **kiến trúc đã chọn ở các mục trước không cần gì của app
native.** Chấm phát âm chạy trên server (quyết định #4), nên app chỉ cần **ghi âm và gửi
lên** — việc mà trình duyệt làm được. Không cần model AI trên máy, không cần thư viện
native nào.

Ba bạn sẽ thấy đúng như một app bình thường:

- Biểu tượng riêng trên màn hình chính, có tên và icon.
- Mở ra là **toàn màn hình**, không thanh địa chỉ, không nút Safari.
- Chạm biểu tượng → màn hình chọn Tài khoản 1 / Tài khoản 2 → học.
- App tự cập nhật khi bạn sửa gì đó. Ba bạn không bao giờ thấy chữ "cập nhật".

**Việc bạn làm một lần trên máy ba bạn** (khoảng 2 phút):

```
1. Mở Safari → vào địa chỉ web của app
2. Bấm nút Chia sẻ (ô vuông có mũi tên đi lên, ở giữa thanh dưới)
3. Kéo xuống chọn "Thêm vào MH chính" (Add to Home Screen)
4. Đặt tên ngắn — ví dụ "Tiếng Anh"
5. Bấm Thêm → biểu tượng xuất hiện trên màn hình chính
6. Kéo biểu tượng ra trang đầu, để chỗ dễ thấy nhất
```

Xong. Từ đó ba bạn không bao giờ phải mở Safari nữa.

### 16.3 Bốn việc kỹ thuật bắt buộc để PWA hoạt động đúng

Không làm đủ bốn việc này thì PWA sẽ có cảm giác "web" chứ không phải "app":

| # | Việc | Vì sao bắt buộc |
|---|---|---|
| 1 | `display: "standalone"` trong manifest | Bỏ thanh địa chỉ Safari. Thiếu cái này ba bạn sẽ thấy nó là trang web |
| 2 | Service Worker + Cache API | Học được khi mạng chập chờn (mục 12.7). Đây là thứ biến web thành app |
| 3 | `navigator.storage.persist()` | Xin quyền lưu trữ lâu dài. **Không có nó, iOS có thể tự xoá dữ liệu app khi máy đầy** — mất sạch tiến độ |
| 4 | Icon 180×180 + tên ngắn | Icon xấu hoặc tên dài bị cắt là thứ đầu tiên làm app trông không đáng tin |

Về (3): iOS chỉ cấp quyền lưu trữ lâu dài cho web app **đã được thêm vào màn hình chính**.
Đây là thêm một lý do phải làm bước "Thêm vào MH chính" chứ không để ba bạn mở bằng
đường link.

### 16.4 Hai giới hạn của PWA cần biết trước

| Giới hạn | Ảnh hưởng tới app này |
|---|---|
| **Không tải nội dung ngầm khi app đóng** | Việc tải trước nội dung tuần mới (mục 12.7) phải làm **lúc ba bạn đang mở app**. Xử lý: Chủ nhật là buổi nhẹ 15 phút — tải trong lúc đó, hiện thanh tiến trình nhỏ |
| **Thông báo nhắc học** | iOS chỉ hỗ trợ từ 16.4 trở lên, và phải xin quyền một lần. Nếu máy ba bạn cũ hơn thì không có nhắc — lúc đó biểu tượng đặt ở trang đầu màn hình chính chính là lời nhắc |

Cả hai đều không chặn việc học, chỉ cần thiết kế quanh chúng.

### 16.5 Nếu sau này muốn lên App Store thật

Không phải làm lại từ đầu. Bọc PWA vào vỏ native (Capacitor hoặc tương đương) là đưa được
lên App Store, giữ nguyên toàn bộ code. Lúc đó mới cần trả 2,5 triệu/năm — và chỉ nên làm
nếu bạn quyết định mở app cho người ngoài gia đình.

**Đề xuất:** đừng làm việc đó bây giờ. Mục tiêu 6 tháng tới là ba bạn học đều, không phải
có mặt trên App Store.

---

## Phụ lục A — Nguồn tham khảo cho cơ chế placement

- [ELSA Speak — English Assessment Test](https://elsaspeak.com/en/web-assessment-test) — đọc câu vào micro, ra kết quả dưới 2 phút
- [SmallTalk2Me — CEFR speaking test 15 phút](https://smalltalk2.me/leveltest) — chấm theo fluency, pronunciation, vocabulary, grammar
- [Promova — AI English level assessment](https://promova.com/test-your-english-level)
- [Preply — Online English level test](https://preply.com/en/language-tests/english)
- [Tracktest — Standalone English Speaking Test](https://tracktest.eu/english-speaking-test/)

---

*Hết tài liệu. Chờ bạn duyệt trước khi bắt đầu code.*
