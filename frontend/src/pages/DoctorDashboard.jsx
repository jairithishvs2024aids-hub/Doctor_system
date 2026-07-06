import { useEffect, useState } from 'react'
import api from '../api'

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([])
  const name = localStorage.getItem('name')

  const fetchAppointments = () => {
    api.get('/doctor/appointments').then(res => setAppointments(res.data)).catch(() => {})
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/doctor/appointments/${id}/status?status=${status}`)
      fetchAppointments()
    } catch {
      alert('Failed to update status')
    }
  }

  const getBadge = (status) => {
    const map = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'secondary' }
    return `badge bg-${map[status] || 'secondary'}`
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-1">Doctor Dashboard</h3>
      <p className="text-muted mb-4">Welcome, {name}!</p>
      <h5>Appointments</h5>
      {appointments.length === 0 && <p className="text-muted">No appointments yet.</p>}
      <table className="table table-bordered table-hover">
        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, i) => (
            <tr key={appt.id}>
              <td>{i + 1}</td>
              <td>{appt.patient?.name}</td>
              <td>{appt.appointmentDate}</td>
              <td><span className={getBadge(appt.status)}>{appt.status}</span></td>
              <td>
                {appt.status === 'PENDING' && (
                  <div className="d-flex gap-2">
                    <button className="btn btn-success btn-sm"
                      onClick={() => updateStatus(appt.id, 'APPROVED')}>Approve</button>
                    <button className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(appt.id, 'REJECTED')}>Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DoctorDashboard
