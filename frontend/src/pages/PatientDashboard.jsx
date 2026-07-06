import { Link } from 'react-router-dom'

function PatientDashboard() {
  const name = localStorage.getItem('name')

  return (
    <div className="container mt-4">
      <h3>Welcome, {name}! 👋</h3>
      <p className="text-muted">What would you like to do today?</p>
      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm p-4">
            <h1>📋</h1>
            <h5>View Doctors</h5>
            <p className="text-muted">Browse available doctors</p>
            <Link to="/doctors" className="btn btn-primary">Go to Doctors</Link>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm p-4">
            <h1>📅</h1>
            <h5>My Appointments</h5>
            <p className="text-muted">View your appointment history</p>
            <Link to="/patient/appointments" className="btn btn-info text-white">View Appointments</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
