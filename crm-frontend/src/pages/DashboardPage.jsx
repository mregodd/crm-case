import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const DashboardPage = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [regionData, setRegionData] = useState([]);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5098/api/customer', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const customers = res.data;
      setTotalCount(customers.length);

      const sorted = [...customers].sort(
        (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
      );
      setRecentCustomers(sorted.slice(0, 5));

      const regionCounts = customers.reduce((acc, curr) => {
        acc[curr.region] = (acc[curr.region] || 0) + 1;
        return acc;
      }, {});
      const regionArray = Object.entries(regionCounts).map(([region, count]) => ({
        region,
        count,
      }));
      setRegionData(regionArray);
    } catch (err) {
      console.error('Dashboard verisi alınırken hata:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'];

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Toplam Müşteri</Typography>
              <Typography variant="h4">{totalCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Son 5 Müşteri</Typography>
              {recentCustomers.map((c) => (
                <Typography key={c.id}>
                  {c.firstName} {c.lastName} — {c.email}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Bölgeye Göre Dağılım</Typography>
              <PieChart width={300} height={300}>
                <Pie
                  data={regionData}
                  dataKey="count"
                  nameKey="region"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
