import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Link } from "react-router-dom";

const ShowTimeList = ({ movieId }) => {
  const [showTimes, setShowTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  dayjs.extend(utc);

  const formatTime = (isoString) => {
    return dayjs.utc(isoString).format("HH:mm");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/showtimes/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🎬 Showtimes fetched:", data);
        setShowTimes(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching showtimes:", err);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <CircularProgress sx={{ mt: 2 }} />;

  if (showTimes.length === 0)
    return (
      <Typography variant="body1" sx={{ mt: 2, color: "black" }}>
        😢 Không có lịch chiếu nào cho phim này.
      </Typography>
    );

  return (
    <List>
      {showTimes.map((showtime) => (
        <ListItem key={showtime.id} divider>
          <ListItemText
            primary={
              <Typography
                component="span"
                variant="body1"
                sx={{ color: "#C0C0C0" }}
              >
                ⏰ {formatTime(showtime.startTime)} -{" "}
                {formatTime(showtime.endTime)}
              </Typography>
            }
            secondary={
              <>
                <Typography component="span" variant="body2" sx={{ color: "#C0C0C0" }}>
                  📍 Phòng: {showtime.room}
                </Typography>
                <br />
                <Typography component="span" variant="body2" sx={{ color: "#C0C0C0" }}>
                  💸 Giá: {showtime.price.toLocaleString()}đ
                </Typography>
              </>
            }
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            component={Link}
            to={`/booking/${showtime.id}`}
          >
            Chọn ghế
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default ShowTimeList;
