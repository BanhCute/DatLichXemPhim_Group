import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Layout/Navbar";
<<<<<<< HEAD
import Footer from "./components/Layout/Footer"; // 👉 import Footer ở đây
import ProtectedRoute from "./components/Auth/ProtectedRoute";

=======
import Footer from "./components/Layout/Footer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
>>>>>>> main
import MoviesList from "./components/Movies/MoviesList";
import MovieDetail from "./components/Movies/MovieDetail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
<<<<<<< HEAD
import SeatSelection from "./components/Bookings/SeatSelection";
import BookingConfirmation from "./components/Bookings/BookingConfirmation";
import Profile from "./components/User/Profile";
=======

import SeatSelection from "./components/Bookings/SeatSelection";
import BookingConfirmation from "./components/Bookings/BookingConfirmation";
import Profile from "./components/User/Profile";

>>>>>>> main
import Home from "./components/Home/Home";
import BookingSuccess from "./components/Bookings/BookingSuccess";
import BookingHistory from "./components/Bookings/BookingHistory";
import AdminMovies from "./components/Admin/AdminMovies";
import AdminGenres from "./components/Admin/AdminGenres";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminBookings from "./components/Admin/AdminBookings";
import AdminShowtimes from "./components/Admin/AdminShowtimes";

// Thêm route bảo vệ cho admin
const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

<<<<<<< HEAD
=======

>>>>>>> main
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/movies"
              element={
                <AdminRoute>
                  <AdminMovies />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/genres"
              element={
                <AdminRoute>
                  <AdminGenres />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <AdminRoute>
                  <AdminBookings />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/showtimes"
              element={
                <AdminRoute>
                  <AdminShowtimes />
                </AdminRoute>
              }
            />
            {/* Protected Routes (sau này thêm auth check) */}
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route
              path="/booking/success/:bookingId"
              element={
                <ProtectedRoute>
                  <BookingSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:showTimeId"
              element={
                <ProtectedRoute>
                  <SeatSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/confirm"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
<<<<<<< HEAD
=======

>>>>>>> main
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
