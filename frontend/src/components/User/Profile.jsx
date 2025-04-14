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
  Stack,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HistoryIcon from "@mui/icons-material/History";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import TheatersIcon from "@mui/icons-material/Theaters";

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
      const response = await fetch(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể tải lịch sử đặt vé");
      }

      const data = await response.json();
      console.log("Booking data:", data); // Thêm log để debug
      setBookings(data.data || []); // Đảm bảo lấy đúng data từ response
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
    <Stack
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 6, position: "relative" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                border: "4px solid",
                borderColor: "primary.main",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  borderColor: "#FF416C",
                },
              }}
            >
              <PersonIcon sx={{ fontSize: 64, color: "#fff" }} />
            </Avatar>
            <Typography
              variant="h3"
              sx={{
                mt: 3,
                mb: 1,
                background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
                backgroundClip: "text",
                textFillColor: "transparent",
                fontWeight: 800,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1.1rem",
              }}
            >
              {user.email}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    color: "#FF416C",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PersonIcon /> Thông tin cá nhân
                </Typography>

                {editMode ? (
                  <Stack spacing={3}>
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
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#FF416C",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                      }}
                    />
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
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#FF416C",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                      }}
                    />
                  </Stack>
                ) : (
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <PersonIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                      <Typography sx={{ color: "#fff" }}>
                        {user.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <EmailIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                      <Typography sx={{ color: "#fff" }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                )}

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 4, justifyContent: "flex-end" }}
                >
                  {editMode ? (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => setEditMode(false)}
                        sx={{
                          borderColor: "#FF416C",
                          color: "#FF416C",
                          "&:hover": {
                            borderColor: "#FF4B2B",
                            background: "rgba(255, 65, 108, 0.1)",
                          },
                        }}
                      >
                        Hủy
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleUpdate}
                        sx={{
                          background:
                            "linear-gradient(45deg, #FF416C, #FF4B2B)",
                          color: "#fff",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #FF4B2B, #FF416C)",
                          },
                        }}
                      >
                        Lưu thay đổi
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setEditMode(true)}
                      startIcon={<PersonIcon />}
                      sx={{
                        background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
                        color: "#fff",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #FF4B2B, #FF416C)",
                        },
                      }}
                    >
                      Chỉnh sửa thông tin
                    </Button>
                  )}
                </Stack>
              </Box>

              <Box
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    color: "#FF416C",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <LockIcon /> Bảo mật
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setPasswordDialog(true)}
                  startIcon={<LockIcon />}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "#fff",
                    p: 1.5,
                    "&:hover": {
                      borderColor: "#FF416C",
                      background: "rgba(255, 65, 108, 0.1)",
                    },
                  }}
                >
                  Đổi mật khẩu
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    flex: 1,
                    minHeight: "calc(100vh - 300px)", // Đảm bảo chiều cao tối thiểu
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: "#FF416C",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <HistoryIcon /> Lịch sử đặt vé
                  </Typography>

                  {bookings.length > 0 ? (
                    <Box
                      sx={{
                        flex: 1,
                        overflow: "auto",
                        pr: 2,
                        mr: -2,
                        maxHeight: "calc(100vh - 400px)", // Chiều cao tối đa
                      }}
                    >
                      {bookings.map((booking) => (
                        <Paper
                          key={booking.id}
                          sx={{
                            mb: 3,
                            background: "rgba(255, 255, 255, 0.03)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "16px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                              borderColor: "rgba(255, 65, 108, 0.3)",
                            },
                          }}
                        >
                          <Box sx={{ p: 2 }}>
                            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                              <Box
                                component="img"
                                src={
                                  booking.showTime?.movie?.imageUrl ||
                                  "https://via.placeholder.com/120x180"
                                }
                                alt={booking.showTime?.movie?.title}
                                sx={{
                                  width: 80,
                                  height: 120,
                                  borderRadius: "8px",
                                  objectFit: "cover",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "#fff",
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    mb: 1,
                                    background:
                                      "linear-gradient(45deg, #FF416C, #FF4B2B)",
                                    backgroundClip: "text",
                                    textFillColor: "transparent",
                                  }}
                                >
                                  {booking.showTime?.movie?.title}
                                </Typography>
                                <Stack spacing={1}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <AccessTimeIcon
                                      sx={{
                                        fontSize: 18,
                                        color: "rgba(255,255,255,0.5)",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        color: "rgba(255,255,255,0.7)",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      {new Date(
                                        booking.showTime?.startTime
                                      ).toLocaleString("vi-VN", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <EventSeatIcon
                                      sx={{
                                        fontSize: 18,
                                        color: "rgba(255,255,255,0.5)",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        color: "rgba(255,255,255,0.7)",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      Ghế:{" "}
                                      {booking.seats
                                        ?.map((seat) => seat.number)
                                        .join(", ")}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <TheatersIcon
                                      sx={{
                                        fontSize: 18,
                                        color: "rgba(255,255,255,0.5)",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        color: "rgba(255,255,255,0.7)",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      Phòng chiếu: {booking.showTime?.room}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 2,
                                pt: 2,
                                borderTop: "1px solid rgba(255,255,255,0.1)",
                              }}
                            >
                              <Chip
                                label={
                                  booking.status === "PENDING"
                                    ? "Chờ xác nhận"
                                    : booking.status === "CONFIRMED"
                                    ? "Đã xác nhận"
                                    : "Đã hủy"
                                }
                                sx={{
                                  backgroundColor:
                                    booking.status === "PENDING"
                                      ? "rgba(255, 167, 38, 0.2)"
                                      : booking.status === "CONFIRMED"
                                      ? "rgba(76, 175, 80, 0.2)"
                                      : "rgba(244, 67, 54, 0.2)",
                                  color:
                                    booking.status === "PENDING"
                                      ? "#ffa726"
                                      : booking.status === "CONFIRMED"
                                      ? "#4caf50"
                                      : "#f44336",
                                  borderRadius: "8px",
                                }}
                              />
                              <Typography
                                sx={{
                                  color: "#FF416C",
                                  fontWeight: 600,
                                  fontSize: "1.1rem",
                                }}
                              >
                                {booking.totalPrice?.toLocaleString()}đ
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        py: 6,
                        px: 2,
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: "16px",
                        border: "1px dashed rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <HistoryIcon
                        sx={{
                          fontSize: 64,
                          color: "rgba(255, 255, 255, 0.2)",
                          mb: 3,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "rgba(255, 255, 255, 0.5)",
                          fontSize: "1.2rem",
                          mb: 3,
                          maxWidth: 400,
                        }}
                      >
                        Bạn chưa có lịch sử đặt vé nào
                      </Typography>
                      <Button
                        variant="contained"
                        href="/movies"
                        sx={{
                          background:
                            "linear-gradient(45deg, #FF416C, #FF4B2B)",
                          color: "#fff",
                          px: 4,
                          py: 1.5,
                          fontSize: "1.1rem",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #FF4B2B, #FF416C)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 5px 15px rgba(255, 65, 108, 0.4)",
                          },
                        }}
                      >
                        Đặt vé ngay
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Dialog
          open={passwordDialog}
          onClose={() => setPasswordDialog(false)}
          PaperProps={{
            sx: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
            },
          }}
        >
          <DialogTitle
            sx={{
              background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
              color: "#fff",
              px: 3,
              py: 2,
            }}
          >
            Đổi mật khẩu
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            {passwordError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {passwordError}
              </Alert>
            )}
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu hiện tại"
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
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setPasswordDialog(false)}
              sx={{ color: "rgba(0, 0, 0, 0.6)" }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleChangePassword}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(45deg, #FF4B2B, #FF416C)",
                },
              }}
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