import { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Giriş isteği gönderiliyor:", { username, password });

      const response = await axios.post(
        "http://localhost:5098/api/auth/login",
        {
          username: username.trim(),
          password,
        }
      );

      console.log("Giriş başarılı:", response.data);

      const { token } = response.data;
      localStorage.setItem("token", token);
      setError("");
      onLoginSuccess();
    } catch (err) {
    console.error("Giriş hatası:", err);
    setError('Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
  }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Giriş Yap</h2>
      <div>
        <label>Kullanıcı Adı:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Giriş</button>
    </form>
  );
};

export default LoginForm;
