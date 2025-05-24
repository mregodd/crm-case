import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const CustomerCreatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    region: '',
    registrationDate: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      axios.get(`http://localhost:5098/api/customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setForm(res.data))
        .catch(() => setError('Müşteri bilgileri yüklenemedi.'));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (id) {
        await axios.put(`http://localhost:5098/api/customer/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5098/api/customer', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/customer');
    } catch (err) {
      setError('Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.', err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ad"
          name="firstName"
          fullWidth
          margin="normal"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Soyad"
          name="lastName"
          fullWidth
          margin="normal"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Bölge"
          name="region"
          fullWidth
          margin="normal"
          value={form.region}
          onChange={handleChange}
          required
        />
        <TextField
          label="Kayıt Tarihi"
          name="registrationDate"
          type="date"
          fullWidth
          margin="normal"
          value={form.registrationDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {id ? 'Güncelle' : 'Kaydet'}
        </Button>
      </form>
    </Paper>
  );
};

export default CustomerCreatePage;
