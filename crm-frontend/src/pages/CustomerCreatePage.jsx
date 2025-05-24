import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setForm(res.data);
        })
        .catch(() => {
          setError('Müşteri bilgileri yüklenemedi.');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (id) {
        await axios.put(`http://localhost:5098/api/customer/${id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://localhost:5098/api/customer', form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      navigate('/customer');
    } catch (err) {
      setError('Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>{id ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}</h2>

      <input type="text" name="firstName" placeholder="Ad" value={form.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Soyad" value={form.lastName} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="text" name="region" placeholder="Bölge" value={form.region} onChange={handleChange} required />
      <input type="date" name="registrationDate" value={form.registrationDate} onChange={handleChange} required />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">{id ? 'Güncelle' : 'Kaydet'}</button>
    </form>
  );
};

export default CustomerCreatePage;
