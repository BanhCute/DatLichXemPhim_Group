import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HistoryIcon from "@mui/icons-material/History";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [bookings, setBookings] = useState([]);

  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Không thể tải thông tin người dùng");
      const data = await res.json();
      setUser(data.data);
      setFormData({ name: data.data.name, email: data.data.email });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Không thể tải lịch sử đặt vé");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/auth/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Không thể cập nhật thông tin");
      const data = await res.json();
      setUser(data.data);
      setEditMode(false);
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Mật khẩu mới không khớp");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Có lỗi xảy ra");
      alert("Đổi mật khẩu thành công!");
      setPasswordDialog(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordError(err.message);
    }
  };

  if (loading) return <Box sx={{ textAlign: "center", py: 5 }}><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>🔄</motion.div></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(145deg, #0f172a, #1e293b)", py: 5 }}>
     <Container maxWidth="sm">
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  >
    <Box
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 15px 50px rgba(0,0,0,0.5)",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            bgcolor: "rgba(255,255,255,0.05)",
            border: "2px solid #e50914",
          }}
        >
          <PersonIcon sx={{ fontSize: 60, color: "#e50914" }} />
        </Avatar>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            mt: 2,
            textShadow: "0 0 10px rgba(229,9,20,0.7)",
          }}
        >
          Hồ sơ người dùng
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

      {[{ label: "Họ tên", icon: <PersonIcon />, value: formData.name, field: "name" }, { label: "Email", icon: <EmailIcon />, value: formData.email, field: "email" }].map(({ label, icon, value, field }) => (
        <Box key={field} sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          {icon}
          {editMode ? (
            <TextField
              fullWidth
              label={label}
              value={value}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              sx={{
                ml: 2,
                input: { color: "white" },
                label: { color: "rgba(255,255,255,0.6)" },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: '#e50914' },
                  '&.Mui-focused fieldset': { borderColor: '#e50914' },
                },
              }}
            />
          ) : (
            <Typography sx={{ ml: 2, color: "white" }}>{value}</Typography>
          )}
        </Box>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3, // 24px
          mt: 4,
        }}
      >
        {editMode ? (
          <>
            <Button variant="outlined" onClick={() => setEditMode(false)} sx={{ color: "white", borderColor: "#e50914" }}>Hủy</Button>
            <Button variant="contained" onClick={handleUpdate} sx={{ background: "linear-gradient(45deg, #e50914, #ff6f61)" }}>Lưu thay đổi</Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={() => setEditMode(true)} sx={{ background: "linear-gradient(45deg, #e50914, #ff6f61)" }}>Chỉnh sửa</Button>
            <Button variant="contained" onClick={() => setPasswordDialog(true)} startIcon={<LockIcon />} sx={{ background: "linear-gradient(45deg, #e50914, #ff6f61)" }}>Đổi mật khẩu</Button>
            <Button variant="contained" onClick={() => navigate("/bookings")} startIcon={<HistoryIcon />} sx={{ background: "linear-gradient(45deg, #e50914, #ff6f61)" }}>Lịch sử đặt vé</Button>
          </>
        )}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 3 }} />

      {/* Phần lịch sử đặt vé giữ nguyên */}
      {/* Phần dialog đổi mật khẩu giữ nguyên */}
    </Box>
  </motion.div>
</Container>

    </Box>
  );
};

export default Profile;