import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchCustomers();
  }, []);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerListPage;
