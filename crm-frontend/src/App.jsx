import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CustomerListPage from './pages/CustomerListPage';
import CustomerCreatePage from './pages/CustomerCreatePage';
import DashboardPage from './pages/DashboardPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customer" element={<CustomerListPage />} />
        <Route path="/customer/create" element={<CustomerCreatePage />} />
        <Route path="/customer/edit/:id" element={<CustomerCreatePage />} />
      </Routes>
    </Router>
  );
};

export default App; 