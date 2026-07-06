import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function DoctorsList() {
  const [doctors, setDoctors] = useState([])
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  useEffect(() => {
    api.get('/doctors').then(res => setDoctors(res.data)).catch(() => {})
  }, [])

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Available Doctors</h3>
      {doctors.length === 0 && <p className="text-muted">No doctors available right now.</p>}
      <div className="row">
        {doctors.map(doc => (
          <div className="col-md-4 mb-3" key={doc.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">👨‍⚕️ {doc.user?.name}</h5>
                <p className="text-muted mb-1">Specialization: <strong>{doc.specialization}</strong></p>
                <p className="text-muted mb-3">Phone: {doc.phone}</p>
                {role === 'PATIENT' && (
                  <button className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/patient/book/${doc.id}`)}>
                    Book Appointment
                  </button>
                )}
                {!role && (
                  <button className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate('/login')}>
                    Login to Book
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
