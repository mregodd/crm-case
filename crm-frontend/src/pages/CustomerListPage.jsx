import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:5098/api/customer', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCustomers(response.data);
    } catch (err) {
      setError('Veri alınırken hata oluştu. Yetkisiz olabilir ya da API çalışmıyor.', err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`http://localhost:5098/api/customer/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCustomers(customers.filter(c => c.id !== id)); // listeden kaldır
      } catch (err) {
        setError('Silme sırasında hata oluştu.', err);
      }
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Müşteri Listesi</h2>

      <button onClick={() => navigate('/customer/create')} style={{ marginBottom: '1rem' }}>
        Yeni Müşteri Ekle
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {customers.length === 0 ? (
        <p>Kayıtlı müşteri bulunamadı.</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              <strong>{customer.firstName} {customer.lastName}</strong> – {customer.email} – {customer.region}
              <button onClick={() => navigate(`/customer/edit/${customer.id}`)} style={{ marginLeft: '0.5rem' }}>
                Düzenle
              </button>
              <button onClick={() => handleDelete(customer.id)} style={{ marginLeft: '0.5rem' }}>
                Sil
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerListPage;
