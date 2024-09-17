import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ClassListPage from './components/ClassListPage';
import OTPPage from './components/OtpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/classes" element={<ClassListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
