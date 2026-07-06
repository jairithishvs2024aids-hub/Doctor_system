import { useEffect, useState } from 'react'
import api from '../api'

function AdminDashboard() {
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [tab, setTab] = useState('doctors')
  const [showForm, setShowForm] = useState(false)
  const [editDoctor, setEditDoctor] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', specialization: '', phone: '' })
  const [message, setMessage] = useState('')

  const fetchDoctors = () => api.get('/doctors').then(res => setDoctors(res.data))
  const fetchAppointments = () => api.get('/admin/appointments').then(res => setAppointments(res.data))

  useEffect(() => {
    fetchDoctors()
    fetchAppointments()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      if (editDoctor) {
        await api.put(`/admin/doctors/${editDoctor.id}`, form)
        setMessage('Doctor updated successfully!')
      } else {
        await api.post('/admin/doctors', form)
        setMessage('Doctor added successfully!')
      }
      setShowForm(false)
      setEditDoctor(null)
      setForm({ name: '', email: '', password: '', specialization: '', phone: '' })
      fetchDoctors()
    } catch {
      setMessage('Something went wrong')
    }
  }

  const handleEdit = (doc) => {
    setEditDoctor(doc)
    setForm({ name: doc.user?.name, email: doc.user?.email, password: '', specialization: doc.specialization, phone: doc.phone })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor?')) return
    await api.delete(`/admin/doctors/${id}`)
    fetchDoctors()
  }

  const getBadge = (status) => {
    const map = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'secondary' }
    return `badge bg-${map[status] || 'secondary'}`
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-1">Admin Dashboard</h3>
      <p className="text-muted mb-3">Manage doctors and appointments</p>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${tab === 'doctors' ? 'active' : ''}`} onClick={() => setTab('doctors')}>
            Doctors
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === 'appointments' ? 'active' : ''}`} onClick={() => setTab('appointments')}>
            Appointments
          </button>
        </li>
      </ul>

      {tab === 'doctors' && (
        <div>
          {message && <div className="alert alert-info">{message}</div>}
          <button className="btn btn-primary mb-3"
            onClick={() => { setShowForm(!showForm); setEditDoctor(null); setForm({ name: '', email: '', password: '', specialization: '', phone: '' }) }}>
            {showForm ? 'Cancel' : '+ Add Doctor'}
          </button>

          {showForm && (
            <div className="card p-4 mb-4 shadow-sm">
              <h5>{editDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <input className="form-control" name="name" placeholder="Full Name"
                      value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input className="form-control" name="email" placeholder="Email" type="email"
                      value={form.email} onChange={handleChange} required={!editDoctor} />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input className="form-control" name="password" placeholder={editDoctor ? "Leave blank to keep password" : "Password"}
                      type="password" value={form.password} onChange={handleChange} required={!editDoctor} />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input className="form-control" name="specialization" placeholder="Specialization"
                      value={form.specialization} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input className="form-control" name="phone" placeholder="Phone"
                      value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
                <button type="submit" className="btn btn-success mt-2">
                  {editDoctor ? 'Update Doctor' : 'Save Doctor'}
                </button>
              </form>
            </div>
          )}

          <table className="table table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, i) => (
                <tr key={doc.id}>
                  <td>{i + 1}</td>
                  <td>{doc.user?.name}</td>
                  <td>{doc.user?.email}</td>
                  <td>{doc.specialization}</td>
                  <td>{doc.phone}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(doc)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'appointments' && (
        <div>
          <table className="table table-bordered table-hover">
            <thead className="table-warning">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, i) => (
                <tr key={appt.id}>
                  <td>{i + 1}</td>
                  <td>{appt.patient?.name}</td>
                  <td>{appt.doctor?.user?.name}</td>
                  <td>{appt.appointmentDate}</td>
                  <td><span className={getBadge(appt.status)}>{appt.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
