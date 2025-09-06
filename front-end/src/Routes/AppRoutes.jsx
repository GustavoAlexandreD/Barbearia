import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home.jsx';
import Login from '../Pages/Login/Login.jsx';
import Register from '../Pages/Register/Register.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;