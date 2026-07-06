import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const name = localStorage.getItem('name')

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🏥 DoctorSystem</Link>
        <div className="navbar-nav ms-auto d-flex flex-row gap-2">
          {!token && <>
            <Link className="nav-link text-white" to="/">Home</Link>
            <Link className="nav-link text-white" to="/doctors">Doctors</Link>
            <Link className="nav-link text-white" to="/login">Login</Link>
            <Link className="nav-link text-white" to="/register">Register</Link>
          </>}
          {token && role === 'PATIENT' && <>
            <Link className="nav-link text-white" to="/patient/dashboard">Dashboard</Link>
            <Link className="nav-link text-white" to="/doctors">Doctors</Link>
            <Link className="nav-link text-white" to="/patient/appointments">My Appointments</Link>
          </>}
          {token && role === 'DOCTOR' && <>
            <Link className="nav-link text-white" to="/doctor/dashboard">Dashboard</Link>
          </>}
          {token && role === 'ADMIN' && <>
            <Link className="nav-link text-white" to="/admin/dashboard">Dashboard</Link>
          </>}
          {token && (
            <span className="nav-link text-white">
              Hi, {name} &nbsp;
              <button className="btn btn-sm btn-outline-light" onClick={logout}>Logout</button>
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
