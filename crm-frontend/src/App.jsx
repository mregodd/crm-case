import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CustomerListPage from './pages/CustomerListPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/customers" element={<CustomerListPage />} />
      </Routes>
    </Router>
  );
};

export default App; 