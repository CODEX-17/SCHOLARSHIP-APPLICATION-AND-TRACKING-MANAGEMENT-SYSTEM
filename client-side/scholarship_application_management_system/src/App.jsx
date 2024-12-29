import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './Pages/Login/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import ResetPasswordPage from './Pages/ResetPassword/ResetPasswordPage';
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import ApplicationForm from './Pages/ApplicationForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="welcome-page" element={<WelcomePage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/register" element={<CreateAccount/>} />
          <Route path="/form" element={<ApplicationForm/>} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
