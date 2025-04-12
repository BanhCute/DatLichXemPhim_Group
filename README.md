# 🎬 Dự Án Đặt Lịch Xem Phim (Nhóm)

[![Status](https://img.shields.io/badge/Status-Đang%20Phát%20Triển-brightgreen)](https://github.com/BanhCute/DatLichXemPhim_Group)
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%26%20Express-green)](https://nodejs.org/)
[![Neon](https://img.shields.io/badge/Database-Neon%20(PostgreSQL)-purple)](https://neon.tech/)

**Dự Án Đặt Lịch Xem Phim** là một ứng dụng web cho phép người dùng tìm kiếm, xem thông tin phim, đặt lịch xem phim và quản lý vé. Đây là dự án nhóm cho môn học, với mục tiêu thực hành quy trình làm việc nhóm trên Git và quản lý công việc qua Jira. Ứng dụng được xây dựng với **React** cho phần frontend, **Node.js** và **Express** cho phần backend, và sử dụng **Neon** (dịch vụ PostgreSQL serverless) làm cơ sở dữ liệu.

---

## 📋 Tổng Quan Dự Án

Ứng dụng cung cấp các tính năng chính:
- **Tìm kiếm phim**: Tìm kiếm phim theo tên hoặc thể loại.
- **Xem chi tiết phim**: Hiển thị thông tin chi tiết (mô tả, thời lượng, thể loại, v.v.).
- **Đặt lịch xem phim**: Chọn suất chiếu và đặt vé.
- **Quản lý vé**: Quản lý thông tin vé đã đặt (yêu cầu đăng nhập).
- **Quản lý phim và suất chiếu**: Admin có thể thêm, sửa, xóa phim và lịch chiếu.

### Cấu trúc dự án
- **`frontend/`**: Mã nguồn giao diện người dùng (React).
- **`backend/`**: Mã nguồn server (Node.js, Express).
- **`.gitignore`**: Định nghĩa các tệp/thư mục bỏ qua khi đẩy lên Git.

**Lưu ý**: Hiện tại, các thư mục `frontend/` và `backend/` đang trống. Thành viên nhóm cần lấy code từ dự án cũ và đẩy lên qua nhánh riêng.

---

## 🛠️ Công Nghệ Sử Dụng

| **Phần**                  | **Công Nghệ**                     |
|---------------------------|-----------------------------------|
| **Frontend**              | React, Material-UI, Moment        |
| **Backend**               | Node.js, Express, Multer          |
| **Database**              | Neon (PostgreSQL serverless)      |
| **Quản lý Dependencies**  | npm                               |
| **Quản lý Công Việc**     | Jira                              |

---

## 📦 Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:
- **Node.js** (phiên bản 16.x hoặc cao hơn).
- **npm** (thường đi kèm với Node.js).
- Tài khoản **Neon** để quản lý cơ sở dữ liệu PostgreSQL.
- Trình duyệt web (Chrome, Firefox, v.v.).
- (Tùy chọn) **pgAdmin** hoặc công cụ quản lý PostgreSQL để kiểm tra cơ sở dữ liệu.
- **Git** để làm việc với repository.

---

## 🚀 Hướng Dẫn Thiết Lập Và Làm Việc

Dưới đây là các bước để clone repository, lấy code từ dự án cũ, và làm việc trên nhánh riêng:

### 1. Clone Dự Án
Clone mã nguồn từ repository:
```bash
git clone https://github.com/BanhCute/DatLichXemPhim_Group.git
cd DatLichXemPhim_Group
```

### 2. Tạo Nhánh Riêng Để Làm Việc
Tạo nhánh riêng cho phần bạn phụ trách (frontend hoặc backend):
```bash
git checkout -b yourname-fe  # Nếu làm frontend
# hoặc
git checkout -b yourname-be  # Nếu làm backend
```

### 3. Lấy Code Từ Dự Án Cũ
- Dự án hiện tại không chứa code đầy đủ. Bạn cần lấy code từ dự án cũ `DatLichXemPhim` (https://github.com/BanhCute/DatLichXemPhim).
- Clone dự án cũ (nếu chưa có):
  ```bash
  git clone https://github.com/BanhCute/DatLichXemPhim.git
  ```
- **Frontend**:
  - Copy thư mục `frontend/` từ `DatLichXemPhim` vào thư mục `frontend/` của `DatLichXemPhim_Group`.
- **Backend**:
  - Copy thư mục `backend/` từ `DatLichXemPhim` vào thư mục `backend/` của `DatLichXemPhim_Group`.

### 4. Cài Đặt Dependencies

#### Backend
1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Nếu `npm install` không cài đầy đủ, hãy đảm bảo cài thêm các thư viện sau:
   ```bash
   npm install multer mongoose dotenv pg
   ```
   - **`multer`**: Xử lý upload file (có thể dùng để upload hình ảnh phim).
   - **`mongoose`**: ORM cho MongoDB (nếu dự án dùng MongoDB thay vì hoặc kết hợp với Neon/PostgreSQL).
   - **`dotenv`**: Quản lý biến môi trường.
   - **`pg`**: Thư viện để kết nối với PostgreSQL.

4. Tạo tệp `.env` trong thư mục `backend` và cấu hình các biến môi trường:
   ```env
   PORT=5000
   DATABASE_URL=<your-neon-postgresql-url>
   MONGO_URI=<your-mongodb-uri> # Nếu dùng MongoDB
   ```
   - Lấy `DATABASE_URL` từ bảng điều khiển Neon.
   - Nếu dùng MongoDB, lấy `MONGO_URI` từ MongoDB Atlas hoặc local MongoDB.

#### Frontend
1. Di chuyển vào thư mục frontend:
   ```bash
   cd ../frontend
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Nếu `npm install` không cài đầy đủ, hãy đảm bảo cài thêm các thư viện sau:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled moment
   ```
   - **`@mui/material`, `@emotion/react`, `@emotion/styled`**: Thư viện Material-UI cho giao diện.
   - **`moment`**: Thư viện xử lý ngày giờ (dùng để định dạng thời gian, ví dụ: lịch chiếu phim).

### 5. Cấu Hình Cơ Sở Dữ Liệu
- **Neon (PostgreSQL)**:
  1. Đăng nhập vào tài khoản Neon, tạo một dự án và lấy chuỗi kết nối (connection string).
  2. Cập nhật chuỗi kết nối vào tệp `.env` của backend (xem bước 4).
  3. Tạo các bảng cần thiết (phim, suất chiếu, vé, người dùng, v.v.) bằng cách chạy các script SQL (nếu có trong dự án) hoặc sử dụng công cụ như pgAdmin.
- **MongoDB (nếu sử dụng)**:
  1. Đảm bảo MongoDB đang chạy (local hoặc trên Atlas).
  2. Cập nhật `MONGO_URI` trong `.env`.

### 6. Chạy Ứng Dụng

#### Backend
Trong thư mục `backend`, khởi động server:
```bash
npm start
```
Server sẽ chạy tại `http://localhost:5000`. Kiểm tra API bằng cách truy cập một endpoint (nếu có), ví dụ: `http://localhost:5000/api/movies`.

#### Frontend
Trong thư mục `frontend`, chạy ứng dụng React:
```bash
npm start
```
Ứng dụng sẽ mở tại `http://localhost:3000` trong trình duyệt.

### 7. Kiểm Tra Cơ Sở Dữ Liệu
- **Neon**: Sử dụng bảng điều khiển Neon hoặc pgAdmin để kiểm tra kết nối và dữ liệu.
- **MongoDB**: Sử dụng MongoDB Compass hoặc lệnh `mongo` để kiểm tra.

### 8. Commit Và Đẩy Code Lên Nhánh Của Bạn
- Sau khi thêm code và kiểm tra chạy ổn, commit và đẩy lên:
  ```bash
  git add .
  git commit -m "Add frontend/backend code from DatLichXemPhim"
  git push origin yourname-fe  # Hoặc yourname-be
  ```

### 9. Tạo Pull Request
1. Truy cập repository trên GitHub.
2. Nhấn vào "Compare & pull request" cho nhánh của bạn.
3. Điền mô tả thay đổi và nhấn **Create pull request**.
4. Thông báo cho trưởng nhóm (BanhCute) để xem xét và merge vào nhánh `main`.

---

## 🛠️ Quy Trình Làm Việc Với Git

### 1. Làm Việc Trên Nhánh Riêng
- Luôn làm việc trên nhánh của bạn (ví dụ: `yourname-fe` hoặc `yourname-be`).
- Sau khi hoàn thành một phần công việc, commit thay đổi:
  ```bash
  git add .
  git commit -m "Add feature X to frontend/backend"
  ```

### 2. Đẩy Nhánh Lên GitHub
- Đẩy nhánh của bạn lên repository:
  ```bash
  git push origin yourname-fe  # Hoặc yourname-be
  ```

### 3. Tạo Pull Request
1. Truy cập repository trên GitHub.
2. Nhấn vào "Compare & pull request" cho nhánh của bạn.
3. Điền mô tả thay đổi và nhấn **Create pull request**.
4. Thông báo cho trưởng nhóm (BanhCute) để xem xét và merge vào nhánh `main`.

### 4. Cập Nhật Nhánh `main` Sau Khi Merge
- Sau khi Pull Request được merge, cập nhật nhánh `main` trên máy của bạn:
  ```bash
  git checkout main
  git pull origin main
  ```
- Tiếp tục tạo nhánh mới cho công việc tiếp theo:
  ```bash
  git checkout -b yourname-new-feature
  ```

---

## 📋 Quản Lý Công Việc Với Jira

Dự án sử dụng Jira để phân chia công việc. Bảng Jira đã được set up với các cột:
- **To Do**: Các task cần làm.
- **In Progress**: Task đang thực hiện.
- **Testing**: Task đã hoàn thành, đang kiểm tra.
- **Done**: Task đã hoàn tất và được phê duyệt.

### Hướng Dẫn Sử Dụng Jira
1. **Tạo Task**:
   - Truy cập bảng Jira của nhóm.
   - Nhấn **Create** để tạo task mới, ví dụ: "Implement movie search API (BE)" hoặc "Design movie detail page (FE)".
   - Gán task cho bản thân và đặt trạng thái ban đầu là **To Do**.
2. **Cập Nhật Trạng Thái**:
   - Khi bắt đầu làm task, kéo task từ **To Do** sang **In Progress**.
   - Sau khi hoàn thành, kéo sang **Testing**.
   - Khi được kiểm tra và xác nhận, kéo sang **Done**.
3. **Liên Kết Với Commit**:
   - Khi commit code, thêm mã task Jira vào commit message, ví dụ:
     ```bash
     git commit -m "MOVIE-123: Add movie search API endpoint"
     ```
     (Thay `MOVIE-123` bằng mã task trên Jira).

---

## ⚠️ Lưu Ý Khi Làm Việc
1. **Thiếu Dependencies**: Nếu `npm install` không cài hết thư viện, kiểm tra `package.json` trong cả `frontend` và `backend` để đảm bảo tất cả thư viện được liệt kê.
2. **Tệp `.env`**: Tệp này không được đẩy lên Git (do `.gitignore`). Bạn phải tạo lại `.env` trong thư mục `backend` với các biến môi trường cần thiết.
3. **Kết Nối Cơ Sở Dữ Liệu**: Đảm bảo chuỗi kết nối database (Neon hoặc MongoDB) chính xác.
4. **Phiên Bản Node.js**: Sử dụng Node.js 16.x hoặc cao hơn để tránh lỗi tương thích.

---

## ❓ Khắc Phục Sự Cố
- **Lỗi `npm install`**:
  - Xóa thư mục `node_modules` và tệp `package-lock.json`, sau đó chạy lại `npm install`.
  - Cài thủ công các thư viện bị thiếu (ví dụ: `npm install moment`).
- **Lỗi Kết Nối Database**:
  - Kiểm tra chuỗi kết nối trong `.env`.
  - Đảm bảo Neon hoặc MongoDB đang hoạt động.
- **Lỗi Frontend Không Hiển Thị**:
  - Kiểm tra console trình duyệt để xem lỗi (F12 > Console).
  - Đảm bảo backend đang chạy và API trả về dữ liệu đúng.
- **Lỗi Git Merge Conflict**:
  - Nếu xảy ra xung đột khi merge, mở tệp xung đột, sửa thủ công, sau đó:
    ```bash
    git add .
    git commit -m "Resolve merge conflict"
    git push origin your-branch
    ```

---

## 📢 Góp Ý
Nếu bạn gặp vấn đề hoặc muốn bổ sung tính năng, hãy tạo issue trên repository hoặc liên hệ trưởng nhóm.

---

## 👥 Đóng Góp
- [BanhCute](https://github.com/BanhCute) (Trưởng nhóm)
- (Thêm tên thành viên khác sau khi họ tham gia)

---

**Dự Án Đặt Lịch Xem Phim** là một dự án nhóm cho môn học, nhằm thực hành quy trình làm việc nhóm với Git và Jira. Cảm ơn bạn đã tham gia! 🎥
