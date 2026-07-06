import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

function BookAppointment() {
  const { doctorId } = useParams()
  const [date, setDate] = useState('')
  const [doctor, setDoctor] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/doctors').then(res => {
      const found = res.data.find(d => d.id === parseInt(doctorId))
      setDoctor(found)
    })
  }, [doctorId])

  const handleBook = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      await api.post('/patient/appointments', { doctorId: parseInt(doctorId), appointmentDate: date })
      setMessage('Appointment booked successfully!')
      setTimeout(() => navigate('/patient/appointments'), 1500)
    } catch (err) {
      setError('Failed to book appointment. Please try again.')
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h4 className="mb-3">Book Appointment</h4>
              {doctor && (
                <div className="alert alert-info">
                  <strong>Doctor:</strong> {doctor.user?.name} <br />
                  <strong>Specialization:</strong> {doctor.specialization}
                </div>
              )}
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleBook}>
                <div className="mb-3">
                  <label className="form-label">Appointment Date</label>
                  <input type="date" className="form-control" value={date}
                    onChange={e => setDate(e.target.value)} required
                    min={new Date().toISOString().split('T')[0]} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Confirm Booking</button>
                <button type="button" className="btn btn-secondary w-100 mt-2"
                  onClick={() => navigate('/doctors')}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointment
