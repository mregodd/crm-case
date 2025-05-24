import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5098/api/auth/login", {
        username: username.trim(),
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      setError("");
      onLoginSuccess();
    } catch (err) {
      console.error("Giriş hatası:", err);
      setError("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: "auto", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Giriş Yap
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Kullanıcı Adı"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Şifre"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Giriş Yap
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
