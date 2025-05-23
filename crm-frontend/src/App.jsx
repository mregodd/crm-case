import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Diğer sayfalar buraya eklenebilir */}
      </Routes>
    </Router>
  );
};

export default App; 