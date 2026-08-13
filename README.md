# Tiếng Anh Thực Chiến

App học tiếng Anh giao tiếp cho hai người trong gia đình — 45 phút mỗi ngày, 6 tháng.

Giáo trình và toàn bộ quyết định thiết kế nằm ở [`curriculum.md`](./curriculum.md).
Mã nguồn tham chiếu tới các mục trong đó (ví dụ "§13.1") thay vì lặp lại lý do.

## Chạy thử

```bash
npm install
npm run dev        # mở địa chỉ hiện ra trên máy, hoặc trên điện thoại cùng Wi-Fi
```

## Các lệnh

| Lệnh | Việc |
|---|---|
| `npm run dev` | Chạy bản phát triển |
| `npm run build` | Đóng gói vào `dist/` |
| `npm run preview` | Chạy thử bản đã đóng gói |
| `npm test` | Chạy unit test (streak, kho dữ liệu) |
| `npm run typecheck` | Kiểm tra kiểu |
| `npm run smoke` | Chạy app thật trên trình duyệt cỡ điện thoại, kiểm tra luồng chính |
| `npm run icons` | Sinh lại bộ icon PWA |

`npm run smoke` cần server đang chạy (`npm run preview`). Trong môi trường không tải
được Chromium, đặt `CHROMIUM_PATH` trỏ tới binary có sẵn.

## Cài lên iPhone

App là PWA (§16.2) — không qua App Store, không hết hạn, tự cập nhật.
Làm một lần trên máy người học:

1. Mở Safari, vào địa chỉ web của app
2. Bấm nút Chia sẻ → **Thêm vào MH chính**
3. Đặt tên ngắn, bấm Thêm
4. Kéo biểu tượng ra trang đầu màn hình chính

Từ đó người học chỉ chạm biểu tượng, không cần mở Safari nữa.

## App hoạt động thế nào

Toàn bộ dữ liệu học nằm **trong máy người học**. Không đăng nhập, không mật khẩu,
không mã, không kho dữ liệu trên mạng. Mở app là học được ngay.

Chỉ có một việc cần mạng: phần nói chuyện với AI và chấm phát âm. Mất mạng thì
buổi học vẫn chạy đủ và vẫn tính chuỗi ngày.

**Chi phí:** khoảng 34.000đ/tháng, chỉ là tiền AI cho phần nói tự do.

**Đánh đổi:** mất điện thoại là mất tiến độ. Cách chống miễn phí là bật sao lưu
iCloud cho máy — xem §13.2b trong `curriculum.md`.

## Cấu trúc

```
src/
  data/        Lưu trữ trong máy, hai tài khoản
  domain/      Logic: ngày tháng, chuỗi ngày học, lịch ôn từ vựng
  platform/    Xin quyền lưu trữ lâu dài của trình duyệt
  ui/          Màn hình
scripts/       Sinh icon, kiểm tra tự động
supabase/      KHÔNG DÙNG — giữ lại phòng khi cần sao lưu trên mạng
```

Quy tắc quan trọng nhất (§13.1): **mọi bản ghi học tập đều có `accountId`**.
Thư viện nội dung là thứ duy nhất dùng chung. Một truy vấn không lọc theo
`accountId` là bug.
