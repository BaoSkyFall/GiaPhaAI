
# Dự án: Ứng Dụng Gia Phả Thông Minh Cho Họ Tộc

## Tổng quan
Ứng dụng nhằm hỗ trợ họ tộc (~5000 người) duy trì, ghi nhớ và kết nối thông tin gia phả, lễ tết, giúp con cháu biết rõ vị trí phả hệ, đồng thời áp dụng công nghệ AI vào việc nhận diện và tương tác trong các dịp lễ.

## ⚙️ Phase 1: Khởi tạo & Tương tác cơ bản
### 🎯 Mục tiêu:
- Tạo sơ đồ gia phả ban đầu
- Cho phép xem, tìm kiếm, và báo lỗi dữ liệu gia phả
- Gửi thông báo qua Zalo OA đến con cháu kèm bài viết trên app/web
- Chuẩn bị dữ liệu nền cho các tính năng AI ở phase 2

### ✅ Tính năng chi tiết:
1. Quản lý cây gia phả
2. Tìm kiếm gia phả
3. Báo lỗi & bổ sung
4. Gửi thông báo lễ tết qua Zalo OA
5. Quản lý bài viết (blog)

## 🧠 Phase 2: Tích hợp AI + Tương tác lễ nghi
### 🎯 Mục tiêu:
- Sử dụng AI để nhận diện khuôn mặt, đối chiếu với ảnh tổ tiên → xác định vị trí trong phả hệ
- Cho phép người dùng đăng ký – đăng nhập
- App check-in khuôn mặt dùng tại bàn lễ (tablet/kiosk)

### ✅ Tính năng chi tiết:
1. AI nhận diện khuôn mặt + đối chiếu gia phả
2. OCR – Nhận diện văn bản (chữ trên bia mộ, giấy tờ)
3. Đăng ký – Đăng nhập
4. App check-in bằng khuôn mặt (tablet lễ nghi)
5. Quản lý danh sách người tham dự lễ

## 🧱 Gợi ý công nghệ
| Thành phần | Công nghệ |
|------------|-----------|
| Frontend (Web/App) | Flutter / React Native / Angular |
| Backend | NestJS / Node.js / Laravel |
| Database | PostgreSQL / MongoDB |
| AI Nhận diện khuôn mặt | Face API (Microsoft) / face-api.js / AWS Rekognition |
| OCR | Tesseract OCR / Google Vision API |
| Zalo OA Notification | Zalo Official Account API |
| Lịch Âm – Dương | lunar-calendar lib / API lịch Việt |

## 🔐 Bảo mật & Quyền riêng tư
- Ảnh khuôn mặt được mã hóa và lưu trữ bảo mật.
- Dữ liệu gia phả chỉ xem được theo quyền.
- Chỉ admin mới có quyền duyệt sửa thông tin.

## 📅 Kế hoạch triển khai gợi ý
| Giai đoạn | Thời gian (ước lượng) | Ghi chú |
|----------|-----------------------|---------|
| Phase 1 | 2–3 tháng | Ưu tiên triển khai trước dịp lễ tết |
| Phase 2 | 3–6 tháng tiếp theo | Triển khai nhận diện AI & check-in |

## 🖼 Mockup UI sơ bộ
Gồm các màn hình:
- Trang chủ
- Cây gia phả
- Chi tiết thành viên
- Blog lễ tết
- Nhận diện khuôn mặt
- Tablet check-in
