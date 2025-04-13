import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  TextField,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [bookings, setBookings] = useState([]);

  // Thêm state cho dialog đổi mật khẩu
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetchUserProfile();
    fetchBookings();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể tải thông tin người dùng");
      }

      const data = await response.json();
      setUser(data.data);
      setFormData({
        name: data.data.name,
        email: data.data.email,
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể tải lịch sử đặt vé");
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/auth/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Không thể cập nhật thông tin");
      }

      const data = await response.json();
      setUser(data.data);
      setEditMode(false);
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      setPasswordError("");

      // Validate form
      if (
        !passwordForm.currentPassword ||
        !passwordForm.newPassword ||
        !passwordForm.confirmPassword
      ) {
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

      const token = localStorage.getItem("token");
      console.log("Sending password change request..."); // Debug log

      const response = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword,
          }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra");
      }

      alert("Đổi mật khẩu thành công!");
      setPasswordDialog(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error details:", err);
      setPasswordError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Stack
    sx={{
      background: "linear-gradient(135deg, #2c3e50 0%, #4a6a8a 100%)",
      width: "100vw",
    }}
    >
      <Container sx={{ py: 4, background: "linear-gradient(135deg, #2c3e50 0%, #4a6a8a 100%)", }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#141414",
            color: "#fff",
            border: "1px solid #333",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto",
                border: "2px solid #e50914",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h4" sx={{ mt: 2 }}>
              Hồ sơ người dùng
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#333" }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: "rgba(255, 255, 255, 0.8)" }} />
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Họ tên"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  />
                ) : (
                  <Typography>{user.name}</Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmailIcon sx={{ mr: 1, color: "rgba(255, 255, 255, 0.8)" }} />
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  />
                ) : (
                  <Typography>{user.email}</Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {editMode ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                  sx={{
                    color: "white",
                    bgcolor: "#e50914",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#ff4d4d",
                    },
                  }}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  onClick={handleUpdate}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  Lưu thay đổi
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => setEditMode(true)}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  Chỉnh sửa thông tin
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setPasswordDialog(true)}
                  startIcon={<LockIcon />}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  Đổi mật khẩu
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/bookings")}
                  startIcon={<HistoryIcon />}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  Lịch sử đặt vé
                </Button>
              </>
            )}
          </Box>

          <List>
            {bookings.map((booking) => (
              <React.Fragment key={booking.id}>
                <ListItem>
                  <ListItemText
                    primary={booking.showTime.movie.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Suất chiếu:{" "}
                          {new Date(
                            booking.showTime.startTime
                          ).toLocaleString()}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Ghế:{" "}
                          {booking.seats.map((seat) => seat.number).join(", ")}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Dialog đổi mật khẩu */}
        <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)}>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
          <DialogContent>
            {passwordError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {passwordError}
              </Alert>
            )}
            <TextField
              fullWidth
              type="password"
              label="Mật khẩu hiện tại"
              margin="dense"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              type="password"
              label="Mật khẩu mới"
              margin="dense"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              type="password"
              label="Xác nhận mật khẩu mới"
              margin="dense"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordDialog(false)}>Hủy</Button>
            <Button
              onClick={handleChangePassword}
              variant="contained"
              color="primary"
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Stack>
  );
};

export default Profile;
