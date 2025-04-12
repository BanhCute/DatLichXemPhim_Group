# 🎬 Dự Án Đặt Lịch Xem Phim (Nhóm)

[![Status](https://img.shields.io/badge/Status-Đang%20Phát%20Triển-brightgreen)](https://github.com/BanhCute/DatLichXemPhim_Group)
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%26%20Express-green)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-orange)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Database-Neon%20(PostgreSQL)-purple)](https://neon.tech/)

**Dự Án Đặt Lịch Xem Phim** là một ứng dụng web cho phép người dùng tìm kiếm, xem thông tin phim, đặt lịch xem phim và quản lý vé. Đây là dự án nhóm cho môn học, với mục tiêu thực hành quy trình làm việc nhóm trên Git và quản lý công việc qua Jira. Ứng dụng được xây dựng với **React** cho phần frontend, **Node.js** và **Express** cho phần backend (dùng **Prisma** để quản lý cơ sở dữ liệu), và sử dụng **Neon** (dịch vụ PostgreSQL serverless) làm cơ sở dữ liệu.

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
  - `src/`: Chứa mã nguồn React (components, pages, logic, v.v.).
  - `public/`: Chứa các tệp tĩnh (index.html, favicon, v.v.).
- **`backend/`**: Mã nguồn server (Node.js, Express, Prisma).
  - `prisma/`: Chứa schema và migration của Prisma (`schema.prisma` nằm trong `prisma/`).
  - `src/`: Chứa mã nguồn chính (controllers, routes, utils, v.v.).
    - `controllers/`: Chứa logic xử lý (movieController.js, authController.js, v.v.).
    - `routes/`: Chứa các route (movies.js, auth.js, showtimes.js, v.v.).
    - `middleware/`: Chứa middleware (auth.js, v.v.).
    - `utils/`: Chứa các tiện ích (upload.js, apiFeatures.js, v.v.).
    - `index.js`: Tệp chính để khởi động server.
  - `.gitignore`: Định nghĩa các tệp/thư mục bỏ qua khi đẩy lên Git.

**Trạng thái hiện tại**:
- **Frontend**: Đã chạy được ở mức cơ bản, hiển thị giao diện `/home` với layout. Cần phát triển các trang chính (Admin, Movie, User, Auth, Booking, ShowTime).
- **Backend**: Đã tích hợp Prisma, kết nối với cơ sở dữ liệu (Neon), và có các route cơ bản (`/api/movies`, `/api/auth`, `/api/showtimes`, `/api/bookings`). Migration đã được tạo và áp dụng để tạo các bảng trong cơ sở dữ liệu. Đã thêm middleware xác thực và upload hình ảnh bằng `multer`. Cần phát triển các route còn lại (như `/api/reviews`, `/api/genres`, `/api/promotions`, v.v.) và logic.

**Phân công công việc**:
- **Backend**:
  - Quốc: `auth`, `booking`, `payment`
  - Lực: `movie`, `genre`, `movieGenre`
  - Bảo Anh: `promotion`, `review`, `showTime`, `upload`
- **Frontend**:
  - Bảo: `Admin`, `movie`, `user`
  - Nam: `Auth`, `booking`, `showtime`

---

## 🛠️ Công Nghệ Sử Dụng

| **Phần**                  | **Công Nghệ**                     |
|---------------------------|-----------------------------------|
| **Frontend**              | React, Material-UI, Moment        |
| **Backend**               | Node.js, Express, Prisma, Multer  |
| **Database**              | Neon (PostgreSQL serverless)      |
| **Quản lý Dependencies**  | npm                               |
| **Quản lý Công Việc**     | Jira                              |

---

## 📦 Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:
- **Node.js** (phiên bản 16.x hoặc 18.x).
- **npm** (thường đi kèm với Node.js).
- Tài khoản **Neon** để quản lý cơ sở dữ liệu PostgreSQL (nếu tạo cơ sở dữ liệu mới).
- Trình duyệt web (Chrome, Firefox, v.v.).
- (Tùy chọn) **pgAdmin** hoặc công cụ quản lý PostgreSQL để kiểm tra cơ sở dữ liệu.
- **Git** để làm việc với repository.

---

## 🚀 Hướng Dẫn Thiết Lập Và Làm Việc

Dưới đây là các bước để clone repository, set up, và làm việc trên nhánh riêng:

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

### 3. Cài Đặt Dependencies

#### Frontend
1. Di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. (Tùy chọn) Tạo tệp `.env` nếu cần biến môi trường:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

#### Backend
1. Di chuyển vào thư mục backend:
   ```bash
   cd ../backend
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Tạo tệp `.env` với nội dung sau:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
   JWT_SECRET=your_jwt_secret
   ```
   - **Lưu ý về `DATABASE_URL`**:
     - Bạn có thể sử dụng cơ sở dữ liệu cũ trên Neon bằng cách lấy `DATABASE_URL` từ Neon Console (trong dự án `DatLichXemPhim`).
     - Nếu không muốn dùng cơ sở dữ liệu cũ, tạo một cơ sở dữ liệu mới trên Neon và lấy `DATABASE_URL` mới.
4. Tạo Prisma Client:
   ```bash
   npx prisma generate
   ```
5. Nếu sử dụng cơ sở dữ liệu mới, chạy migration để tạo các bảng:
   ```bash
   npx prisma migrate dev --name init
   ```

### 4. Chạy Ứng Dụng

#### Backend
Trong thư mục `backend`, khởi động server:
```bash
npm start
```
Server sẽ chạy tại `http://localhost:5000`. Kiểm tra các route:
- `http://localhost:5000/`: Trả về "Welcome to DatLichXemPhim API".
- `http://localhost:5000/api/movies`: Trả về danh sách phim từ cơ sở dữ liệu.
- `http://localhost:5000/api/auth/register`: Đăng ký người dùng.
- `http://localhost:5000/api/auth/login`: Đăng nhập.
- `http://localhost:5000/api/showtimes`: Lấy danh sách suất chiếu.
- `http://localhost:5000/api/bookings`: Đặt vé.

#### Frontend
In a separate terminal, trong thư mục `frontend`, chạy ứng dụng React:
```bash
cd frontend
npm start
```
Ứng dụng sẽ mở tại `http://localhost:3000` trong trình duyệt, hiển thị giao diện `/home`.

### 5. Phát Triển Thêm
- **Backend**:
  - Quốc: Hoàn thiện `auth`, `booking`, `payment` APIs.
  - Lực: Hoàn thiện `movie`, `genre`, `movieGenre` APIs.
  - Bảo Anh: Hoàn thiện `promotion`, `review`, `showTime`, `upload` APIs.
- **Frontend**:
  - Bảo: Thiết kế các trang `Admin`, `movie`, `user`.
  - Nam: Thiết kế các trang `Auth`, `booking`, `showtime`.

### 6. Commit Và Đẩy Code Lên Nhánh Của Bạn
- Sau khi phát triển, commit và đẩy lên:
  ```bash
  git add .
  git commit -m "WDXP-<task-id>: <mô-tả-thay-đổi>"
  git push origin yourname-be
  ```

### 7. Tạo Pull Request
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
  git commit -m "WDXP-<task-id>: Add feature X to frontend/backend"
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
- **TO DO**: Các task cần làm.
- **IN PROGRESS**: Task đang thực hiện.
- **TESTING**: Task đã hoàn thành, đang kiểm tra.
- **DONE**: Task đã hoàn tất và được phê duyệt.

### Phân Công Task Trên Jira
- **Backend**:
  - Quốc: WDXP-6 (Auth API), WDXP-7 (Booking API), WDXP-8 (Payment API)
  - Lực: WDXP-9 (Movie API), WDXP-10 (Genre API), WDXP-11 (MovieGenre API)
  - Bảo Anh: WDXP-12 (Promotion API), WDXP-13 (Review API), WDXP-14 (ShowTime API), WDXP-15 (Upload API)
- **Frontend**:
  - Bảo: WDXP-16 (Admin Dashboard), WDXP-17 (Movie Page), WDXP-18 (User Profile Page)
  - Nam: WDXP-19 (Auth Pages), WDXP-20 (Booking Pages), WDXP-21 (ShowTime Pages)

### Hướng Dẫn Sử Dụng Jira
1. **Bắt Đầu Làm Task**:
   - Mở bảng Jira, tìm task được gán cho bạn.
   - Kéo task từ **TO DO** sang **IN PROGRESS** khi bắt đầu làm.
2. **Cập Nhật Trạng Thái**:
   - Khi hoàn thành, kéo task từ **IN PROGRESS** sang **TESTING**.
   - Sau khi kiểm tra xong, kéo sang **DONE**.
3. **Liên Kết Với Commit**:
   - Khi commit code, thêm mã task Jira vào commit message, ví dụ:
     ```bash
     git commit -m "WDXP-6: Implement Auth API with register and login endpoints"
     ```

---

## ⚠️ Lưu Ý Khi Làm Việc
1. **Thiếu Dependencies**:
   - Nếu `npm install` không cài hết thư viện, kiểm tra `package.json` trong cả `frontend` và `backend` để đảm bảo tất cả thư viện được liệt kê.
2. **Tệp `.env`**:
   - Tệp này không được đẩy lên Git (do `.gitignore`). Bạn phải tạo lại `.env` trong thư mục `frontend` và `backend` với các biến môi trường cần thiết.
3. **Kết Nối Cơ Sở Dữ Liệu**:
   - Nếu dùng cơ sở dữ liệu cũ, đảm bảo `DATABASE_URL` chính xác và cơ sở dữ liệu không bị xung đột.
   - Nếu dùng cơ sở dữ liệu mới, chạy migration để tạo các bảng.
4. **Phiên Bản Node.js**:
   - Sử dụng Node.js 16.x hoặc 18.x để tránh lỗi tương thích.
5. **Thay Đổi Schema**:
   - Nếu thay đổi `schema.prisma`, hãy cẩn thận vì có thể ảnh hưởng đến dữ liệu hiện có. Sao lưu dữ liệu trước khi chạy migration:
     ```bash
     pg_dump -h <host> -U <username> -d DatLichXemPhim > backup.sql
     ```

---

## ❓ Khắc Phục Sự Cố
- **Lỗi `npx prisma generate`**:
  - Đảm bảo tệp `schema.prisma` nằm trong `prisma/` (`prisma/schema.prisma`).
  - Chạy lệnh với `--schema`:
    ```bash
    npx prisma generate --schema=prisma/schema.prisma
    ```
  - Thêm cấu hình vào `package.json`:
    ```json
    "prisma": {
      "schema": "prisma/schema.prisma"
    }
    ```
- **Lỗi `npx prisma migrate dev`**:
  - Kiểm tra `DATABASE_URL` trong `.env`.
  - Đảm bảo Neon đang hoạt động và bạn có quyền truy cập.
  - Nếu cơ sở dữ liệu đã có dữ liệu, sử dụng `--create-only` để tạo migration mà không áp dụng ngay:
    ```bash
    npx prisma migrate dev --create-only --name init
    ```
- **Lỗi Kết Nối Database**:
  - Kiểm tra `DATABASE_URL` trong `.env`.
  - Đảm bảo Neon đang hoạt động và bạn có quyền truy cập.
- **Lỗi Prisma**:
  - Đảm bảo đã chạy `npx prisma generate` sau khi thay đổi `schema.prisma`.
  - Nếu migration thất bại, kiểm tra kết nối database hoặc đồng bộ schema:
    ```bash
    npx prisma db pull
    npx prisma migrate dev --name sync
    ```
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
- Quốc (Backend: Auth, Booking, Payment)
- Lực (Backend: Movie, Genre, MovieGenre)
- Bảo Anh (Backend: Promotion, Review, ShowTime, Upload)
- Bảo (Frontend: Admin, Movie, User)
- Nam (Frontend: Auth, Booking, ShowTime)

---

**Dự Án Đặt Lịch Xem Phim** là một dự án nhóm cho môn học, nhằm thực hành quy trình làm việc nhóm với Git và Jira. Cảm ơn bạn đã tham gia! 🎥
