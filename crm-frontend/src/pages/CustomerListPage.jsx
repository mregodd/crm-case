import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Box } from '@mui/material';

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
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const fetchCustomers = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5098/api/customer', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...filters,
          page: page + 1,
          pageSize,
        },
      });
      setCustomers(response.data);
    } catch (err) {
      setError('Veri alınırken hata oluştu.', err);
    }
  }, [filters, page, pageSize]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPage(0);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`http://localhost:5098/api/customer/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCustomers();
      } catch (err) {
        setError('Silme sırasında hata oluştu.', err);
      }
    }
  };

  const columns = [
    { field: 'firstName', headerName: 'Ad', width: 130 },
    { field: 'lastName', headerName: 'Soyad', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'region', headerName: 'Bölge', width: 130 },
    { field: 'registrationDate', headerName: 'Kayıt Tarihi', width: 160 },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => navigate(`/customer/edit/${params.row.id}`)}
            style={{ marginRight: 8 }}
          >
            Düzenle
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Sil
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 1100, margin: 'auto', mt: 4 }}>
      <h2>Müşteri Listesi</h2>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField
          label="Ad/Soyad"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <TextField
          label="Email"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <TextField
          label="Bölge"
          name="region"
          value={filters.region}
          onChange={handleFilterChange}
        />
        <TextField
          label="Başlangıç Tarihi"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Bitiş Tarihi"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={() => navigate('/customer/create')}>
          Yeni Müşteri Ekle
        </Button>
      </Box>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          getRowId={(row) => row.id}
        />
      </div>
    </Box>
  );
};

export default CustomerListPage;
