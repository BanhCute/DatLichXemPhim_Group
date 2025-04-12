import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";

const AdminGenres = () => {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [editGenre, setEditGenre] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(2);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/genres", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setGenres(data.data);
    } catch (err) {
      setError("Không thể tải danh sách thể loại");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url = editGenre
        ? `http://localhost:5000/api/genres/${editGenre.id}`
        : "http://localhost:5000/api/genres";

      const method = editGenre ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Thao tác không thành công");

      setOpen(false);
      fetchGenres();
      setFormData({ name: "" });
      setEditGenre(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa thể loại này?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/genres/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Không thể xóa thể loại");

      fetchGenres();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate("/admin");
        break;
      case 1:
        navigate("/admin/movies");
        break;
      case 2:
        navigate("/admin/genres");
        break;
      case 3:
        navigate("/admin/users");
        break;
      case 4:
        navigate("/admin/bookings");
        break;
      case 5:
        navigate("/admin/showtimes");
        break;
      
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Admin Navigation */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              color: "#666",
              "&.Mui-selected": {
                color: "#e50914",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#e50914",
            },
          }}
        >
          <Tab label="DASHBOARD" />
          <Tab label="QUẢN LÝ PHIM" />
          <Tab label="QUẢN LÝ THỂ LOẠI" />
          <Tab label="QUẢN LÝ NGƯỜI DÙNG" />
          <Tab label="QUẢN LÝ ĐẶT VÉ" />
          <Tab label="QUẢN LÝ SUẤT CHIẾU" />
        </Tabs>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Quản Lý Thể Loại</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditGenre(null);
            setFormData({ name: "" });
            setOpen(true);
          }}
          sx={{
            backgroundColor: "#e50914",
            "&:hover": {
              backgroundColor: "#b81d24",
            },
          }}
        >
          Thêm Thể Loại Mới
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Thể Loại</TableCell>
              <TableCell align="right">Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres.map((genre) => (
              <TableRow key={genre.id}>
                <TableCell>{genre.id}</TableCell>
                <TableCell>{genre.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setEditGenre(genre);
                      setFormData({ name: genre.name });
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(genre.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editGenre ? "Chỉnh Sửa Thể Loại" : "Thêm Thể Loại Mới"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên thể loại"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editGenre ? "Cập Nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminGenres;
