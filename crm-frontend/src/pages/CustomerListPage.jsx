import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    region: '',
    startDate: '',
    endDate: ''
  });
  const navigate = useNavigate();

  

  const fetchCustomers = useCallback(async () => {
    const token = localStorage.getItem('token');

    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.email) params.email = filters.email;
    if (filters.region) params.region = filters.region;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    try {
      const response = await axios.get('http://localhost:5098/api/customer', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      });
      setCustomers(response.data);
    } catch (err) {
      setError('Veri alınırken hata oluştu.', err);
    }
  }, [filters]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchCustomers();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`http://localhost:5098/api/customer/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCustomers(customers.filter(c => c.id !== id));
      } catch (err) {
        setError('Silme sırasında hata oluştu.', err);
      }
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h2>Müşteri Listesi</h2>

      <button onClick={() => navigate('/customer/create')} style={{ marginBottom: '1rem' }}>
        Yeni Müşteri Ekle
      </button>

      <form onSubmit={handleFilterSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Ad veya Soyad"
          value={filters.name}
          onChange={handleFilterChange}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleFilterChange}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          name="region"
          placeholder="Bölge"
          value={filters.region}
          onChange={handleFilterChange}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          style={{ marginRight: '0.5rem' }}
        />
      </form>

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
