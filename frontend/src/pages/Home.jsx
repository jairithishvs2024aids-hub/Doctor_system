import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1 className="display-5 fw-bold">Welcome to Doctor Appointment System</h1>
        <p className="col-md-8 mx-auto fs-5 text-muted">
          Book appointments with top doctors easily. Manage your health from one place.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/register" className="btn btn-primary btn-lg">Register as Patient</Link>
          <Link to="/doctors" className="btn btn-outline-secondary btn-lg">View Doctors</Link>
        </div>
      </div>

      <div className="row text-center mt-4">
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h3>📅</h3>
            <h5>Easy Booking</h5>
            <p className="text-muted">Book appointments in just a few clicks</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h3>👨‍⚕️</h3>
            <h5>Top Doctors</h5>
            <p className="text-muted">Find specialists in various fields</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h3>✅</h3>
            <h5>Track Status</h5>
            <p className="text-muted">View and manage your appointments</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
