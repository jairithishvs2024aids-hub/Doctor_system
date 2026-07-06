import { useEffect, useState } from 'react'
import api from '../api'

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([])

  const fetchAppointments = () => {
    api.get('/patient/appointments').then(res => setAppointments(res.data)).catch(() => {})
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return
    try {
      await api.put(`/patient/appointments/${id}/cancel`)
      fetchAppointments()
    } catch {
      alert('Failed to cancel appointment')
    }
  }

  const getBadge = (status) => {
    const map = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'secondary' }
    return `badge bg-${map[status] || 'secondary'}`
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Appointments</h3>
      {appointments.length === 0 && <p className="text-muted">You have no appointments yet.</p>}
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>Specialization</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, i) => (
            <tr key={appt.id}>
              <td>{i + 1}</td>
              <td>{appt.doctor?.user?.name}</td>
              <td>{appt.doctor?.specialization}</td>
              <td>{appt.appointmentDate}</td>
              <td><span className={getBadge(appt.status)}>{appt.status}</span></td>
              <td>
                {appt.status === 'PENDING' && (
                  <button className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(appt.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentHistory
