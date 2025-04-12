import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useNavigate } from "react-router-dom";

const ShowTimesList = ({ movieId }) => {
  const [showTimes, setShowTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  dayjs.extend(utc);

  const formatTime = (isoString) => {
    return dayjs(isoString).format("HH:mm - DD/MM/YYYY");
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/showtimes/movie/${movieId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không thể tải lịch chiếu");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Showtimes data:", data);
        setShowTimes(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching showtimes:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [movieId]);

  const handleBooking = (showtime) => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("redirectUrl", window.location.pathname);
      navigate("/login");
      return;
    }

    // Kiểm tra thời gian đã qua
    if (dayjs(showtime.startTime).isBefore(dayjs())) {
      alert("Suất chiếu này đã kết thúc!");
      return;
    }

    navigate(`/booking/${showtime.id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ py: 2 }}>
        ❌ {error}
      </Typography>
    );
  }

  if (showTimes.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center", bgcolor: "grey.100" }}>
        <Typography variant="body1">
          😢 Hiện chưa có lịch chiếu cho phim này
        </Typography>
      </Paper>
    );
  }

  // Phân loại suất chiếu
  const now = dayjs();
  const pastShowtimes = showTimes.filter((st) =>
    dayjs(st.startTime).isBefore(now)
  );
  const upcomingShowtimes = showTimes.filter(
    (st) => !dayjs(st.startTime).isBefore(now)
  );

  return (
    <Box>
      {/* Suất chiếu sắp tới */}
      {upcomingShowtimes.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            🎬 Suất chiếu sắp tới
          </Typography>
          <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            {upcomingShowtimes.map((showtime) => (
              <ListItem
                key={showtime.id}
                divider
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      🕒 {formatTime(showtime.startTime)}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        📍 Phòng: {showtime.room}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="primary"
                      >
                        💰 Giá: {showtime.price?.toLocaleString()}đ
                      </Typography>
                    </>
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBooking(showtime)}
                  sx={{
                    ml: 2,
                    minWidth: 120,
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Đặt vé
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Suất chiếu đã qua */}
      {pastShowtimes.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            📅 Suất chiếu đã qua
          </Typography>
          <List sx={{ bgcolor: "grey.100", borderRadius: 1, opacity: 0.8 }}>
            {pastShowtimes.map((showtime) => (
              <ListItem
                key={showtime.id}
                divider
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      🕒 {formatTime(showtime.startTime)}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        📍 Phòng: {showtime.room}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        💰 Giá: {showtime.price?.toLocaleString()}đ
                      </Typography>
                    </>
                  }
                />
                <Chip label="Đã kết thúc" color="default" sx={{ ml: 2 }} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default ShowTimesList;