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
12. [Bảng kê nội dung cần sản xuất](#12-bảng-kê-nội-dung-cần-sản-xuất)
13. [Rủi ro & câu hỏi mở cần bạn quyết](#13-rủi-ro--câu-hỏi-mở-cần-bạn-quyết)

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
nếu người ta nói chậm. Dùng smartphone tốt (Zalo/YouTube/Facebook, tự cài app,
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

**Giả định thiết kế (cần bạn xác nhận ở mục 13):**
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

## 12. Bảng kê nội dung cần sản xuất

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

## 13. Rủi ro & câu hỏi mở cần bạn quyết

### Rủi ro đã nhận diện

| Rủi ro | Mức | Cách giảm thiểu đã thiết kế |
|---|---|---|
| Chấm phát âm sai → người học mất niềm tin | 🔴 Cao | Dùng 3 mức mô tả thay vì điểm số ở GĐ1; luôn cho nghe đối chiếu để tự phán đoán; không bao giờ chặn tiến độ |
| Bỏ cuộc ở tuần 3–5 (giai đoạn hết hứng mới) | 🔴 Cao | Buổi tối thiểu 5 phút; tuần 4 có tình huống gọi món — thứ ứng dụng được ngay |
| Nội dung nghe quá khó ở GĐ2 gây nản | 🟡 TB | Tự động hạ tốc độ khi 3 buổi liên tiếp < 60% |
| Role-play bằng LLM trả lời lệch vai hoặc quá dài | 🟡 TB | Ràng buộc kịch bản, giới hạn độ dài lượt của app theo trình độ người học |
| 45 phút quá dài, thực tế chỉ trụ được 25 | 🟡 TB | Kiến trúc 4 khối cho phép cắt ngang bất cứ đâu mà vẫn có giá trị |

### Câu hỏi cần bạn quyết trước khi tôi code

1. **Giọng chuẩn:** Mỹ hay Anh-Anh làm giọng mẫu chính? (Tôi đề xuất **Mỹ** —
   nhiều tài nguyên hơn và phổ biến hơn ở Việt Nam.)
2. **Role-play do LLM đóng vai hay kịch bản cây quyết định cố định?** LLM tự
   nhiên hơn nhiều nhưng tốn chi phí và khó kiểm soát; kịch bản cố định rẻ và ổn
   định nhưng lặp lại nhanh chán. (Tôi đề xuất **lai**: kịch bản cố định cho
   GĐ1, LLM có ràng buộc từ GĐ2.)
3. **Offline hay bắt buộc online?** Ảnh hưởng lớn tới việc chọn engine chấm phát
   âm và nơi lưu audio.
4. **Nội dung đọc/viết:** giáo trình này gần như bỏ hẳn kỹ năng viết. Bạn có cần
   không? (Tôi khuyên **không** — mục tiêu là giao tiếp, thêm viết sẽ loãng 45 phút.)
5. **Số lượng người dùng:** chỉ dành riêng cho ba bạn, hay định làm sản phẩm cho
   nhiều người? Câu trả lời thay đổi hoàn toàn kiến trúc dữ liệu và khối lượng
   nội dung cần sản xuất ở mục 12.

---

## Phụ lục A — Nguồn tham khảo cho cơ chế placement

- [ELSA Speak — English Assessment Test](https://elsaspeak.com/en/web-assessment-test) — đọc câu vào micro, ra kết quả dưới 2 phút
- [SmallTalk2Me — CEFR speaking test 15 phút](https://smalltalk2.me/leveltest) — chấm theo fluency, pronunciation, vocabulary, grammar
- [Promova — AI English level assessment](https://promova.com/test-your-english-level)
- [Preply — Online English level test](https://preply.com/en/language-tests/english)
- [Tracktest — Standalone English Speaking Test](https://tracktest.eu/english-speaking-test/)

---

*Hết tài liệu. Chờ bạn duyệt trước khi bắt đầu code.*
