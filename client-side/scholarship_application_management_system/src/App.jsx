import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import CreateAccount from './Pages/CreateAccount';
import ResetPasswordPage from './Pages/ResetPassword/ResetPasswordPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/register" element={<CreateAccount/>} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
