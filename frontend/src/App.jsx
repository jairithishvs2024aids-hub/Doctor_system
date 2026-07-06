import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import DoctorsList from './pages/DoctorsList'
import BookAppointment from './pages/BookAppointment'
import AppointmentHistory from './pages/AppointmentHistory'
import Navbar from './components/Navbar'

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')
  if (!token) return <Navigate to="/login" />
  if (role && userRole !== role) return <Navigate to="/" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/patient/dashboard" element={
          <PrivateRoute role="PATIENT"><PatientDashboard /></PrivateRoute>
        } />
        <Route path="/patient/book/:doctorId" element={
          <PrivateRoute role="PATIENT"><BookAppointment /></PrivateRoute>
        } />
        <Route path="/patient/appointments" element={
          <PrivateRoute role="PATIENT"><AppointmentHistory /></PrivateRoute>
        } />
        <Route path="/doctor/dashboard" element={
          <PrivateRoute role="DOCTOR"><DoctorDashboard /></PrivateRoute>
        } />
        <Route path="/admin/dashboard" element={
          <PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
