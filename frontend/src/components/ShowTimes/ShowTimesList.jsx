import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi"; // Import locale tiếng Việt
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WeekendIcon from "@mui/icons-material/Weekend";

moment.locale("vi"); // Sử dụng locale tiếng Việt

const ShowTimesList = ({ movieId, requireAuth }) => {
  const [showTimes, setShowTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShowTimes();
  }, [movieId]);

  const fetchShowTimes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/showtimes");
      const data = await response.json();

      // Lọc các suất chiếu cho phim cụ thể và sắp xếp theo thời gian
      const filteredShowTimes = data.data
        .filter((showtime) => showtime.movieId === parseInt(movieId))
        .sort(
          (a, b) =>
            moment(a.startTime).valueOf() - moment(b.startTime).valueOf()
        );

      setShowTimes(filteredShowTimes);

      // Tự động chọn ngày đầu tiên nếu có suất chiếu
      if (filteredShowTimes.length > 0) {
        setSelectedDate(
          moment(filteredShowTimes[0].startTime)
            .startOf("day")
            .format("YYYY-MM-DD")
        );
      }
    } catch (err) {
      setError("Không thể tải lịch chiếu phim");
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách các ngày có suất chiếu
  const availableDates = [
    ...new Set(
      showTimes.map((showtime) =>
        moment(showtime.startTime).startOf("day").format("YYYY-MM-DD")
      )
    ),
  ].sort();

  // Lọc suất chiếu theo ngày đã chọn
  const filteredShowTimesByDate = showTimes.filter(
    (showtime) =>
      moment(showtime.startTime).startOf("day").format("YYYY-MM-DD") ===
      selectedDate
  );

  const handleBooking = (showtimeId) => {
    if (requireAuth && !localStorage.getItem("token")) {
      alert("Vui lòng đăng nhập để đặt vé");
      navigate("/login");
      return;
    }
    navigate(`/booking/${showtimeId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress sx={{ color: "#FF416C" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (showTimes.length === 0) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        Chưa có lịch chiếu cho phim này
      </Alert>
    );
  }

  return (
    <Box>
      {/* Hiển thị danh sách ngày */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 4, overflowX: "auto", pb: 1 }}
      >
        {availableDates.map((date) => (
          <Chip
            key={date}
            icon={<EventIcon />}
            label={moment(date).format("DD/MM - dddd")}
            onClick={() => setSelectedDate(date)}
            sx={{
              minWidth: "fit-content",
              py: 2.5,
              px: 2,
              fontSize: "1rem",
              backgroundColor:
                selectedDate === date ? "#FF416C" : "rgba(255, 255, 255, 0.1)",
              color:
                selectedDate === date ? "white" : "rgba(255, 255, 255, 0.8)",
              border: "1px solid",
              borderColor:
                selectedDate === date ? "#FF416C" : "rgba(255, 65, 108, 0.2)",
              "&:hover": {
                backgroundColor:
                  selectedDate === date ? "#FF416C" : "rgba(255, 65, 108, 0.2)",
              },
            }}
          />
        ))}
      </Stack>

      {/* Hiển thị suất chiếu theo ngày */}
      <Grid container spacing={2}>
        {filteredShowTimesByDate.map((showtime) => (
          <Grid item xs={12} sm={6} md={4} key={showtime.id}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 65, 108, 0.2)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(255, 65, 108, 0.2)",
                },
              }}
            >
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon sx={{ color: "#FF416C" }} />
                  <Stack>
                    <Typography sx={{ color: "white", fontWeight: 600 }}>
                      {moment(showtime.startTime).format("HH:mm")}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {moment(showtime.startTime).format("DD/MM/YYYY")}
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WeekendIcon sx={{ color: "#FF416C" }} />
                  <Typography sx={{ color: "white" }}>
                    Phòng: {showtime.room}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => handleBooking(showtime.id)}
                  sx={{
                    mt: 1,
                    backgroundColor: "#FF416C",
                    "&:hover": {
                      backgroundColor: "#ff1744",
                    },
                  }}
                >
                  Đặt vé
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShowTimesList;
