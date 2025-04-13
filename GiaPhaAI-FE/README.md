# Gia Phả AI - Frontend

Frontend của dự án quản lý gia phả kết hợp AI.

## Công nghệ sử dụng

- React 18 với TypeScript
- Redux Toolkit cho quản lý state
- Ant Design cho UI components
- React Router v6 cho điều hướng
- Axios cho gọi API
- Vite cho build tool

## Cài đặt

```bash
# Cài đặt các dependencies
npm install

# Chạy môi trường development
npm run dev

# Build cho production
npm run build
```

## Cấu trúc dự án

- `src/components`: Chứa các component tái sử dụng
- `src/pages`: Chứa các trang của ứng dụng
- `src/redux`: Chứa cấu hình và slice cho Redux
- `src/config`: Chứa cấu hình API, Axios
- `src/types`: Chứa các type định nghĩa
- `src/styles`: Chứa các file SCSS
- `src/features`: Chứa các tính năng lớn của ứng dụng

## Tính năng chính

- Quản lý người dùng và phân quyền
- Xem và chỉnh sửa phả đồ gia đình
- Quản lý tin tức và bài viết
- Nhận diện khuôn mặt và OCR
- Thông báo 