import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import ApplicationForm from './Pages/ApplicationForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/application-form" element={<ApplicationForm/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
