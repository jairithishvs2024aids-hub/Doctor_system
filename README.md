# Doctor Appointment System

A full-stack web application for managing doctor appointments, built with React (Vite) + Spring Boot + PostgreSQL.

---

## Tech Stack

- **Frontend**: React (Vite), React Router, Axios, Bootstrap 5
- **Backend**: Spring Boot 3, Spring Data JPA, Spring Security, JWT
- **Database**: PostgreSQL

---

## Project Structure

```
doctorsystem/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/doctorsystem/
│       │   ├── DoctorSystemApplication.java
│       │   ├── DataInitializer.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   ├── DoctorController.java
│       │   │   └── AppointmentController.java
│       │   ├── dto/
│       │   │   ├── RegisterRequest.java
│       │   │   ├── LoginRequest.java
│       │   │   ├── AuthResponse.java
│       │   │   ├── DoctorRequest.java
│       │   │   └── AppointmentRequest.java
│       │   ├── entity/
│       │   │   ├── User.java
│       │   │   ├── Doctor.java
│       │   │   └── Appointment.java
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── DoctorRepository.java
│       │   │   └── AppointmentRepository.java
│       │   ├── service/
│       │   │   ├── AuthService.java
│       │   │   ├── DoctorService.java
│       │   │   └── AppointmentService.java
│       │   └── security/
│       │       ├── JwtUtil.java
│       │       ├── JwtFilter.java
│       │       └── SecurityConfig.java
│       └── resources/
│           └── application.properties
└── frontend/
    ├── public/
    ├── src/
    │   ├── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── components/
    │   │   └── Navbar.jsx
    │   └── pages/
    │       ├── Home.jsx
    │       ├── Login.jsx
    │       ├── Register.jsx
    │       ├── DoctorsList.jsx
    │       ├── PatientDashboard.jsx
    │       ├── BookAppointment.jsx
    │       ├── AppointmentHistory.jsx
    │       ├── DoctorDashboard.jsx
    │       └── AdminDashboard.jsx
    ├── package.json
    └── vite.config.js
```

---

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- PostgreSQL 14+

---

## Setup & Run

### 1. Database Setup

Open pgAdmin or psql and create the database:

```sql
CREATE DATABASE doctorsystem;
```

Tables are auto-created by Spring Boot on first startup.

### 2. Configure Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/doctorsystem
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
jwt.secret=your_jwt_secret_key_minimum_32_characters_long
```

### 3. Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 4. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## Default Login Credentials

| Role    | Email                   | Password  |
|---------|-------------------------|-----------|
| Admin   | admin@hospital.com      | admin123  |
| Doctor  | dr.john@hospital.com    | doctor123 |
| Doctor  | dr.sarah@hospital.com   | doctor123 |
| Patient | Register via /register  | your choice |

---

## API Endpoints

### Auth

| Method | Endpoint           | Description      |
|--------|--------------------|------------------|
| POST   | /api/auth/register | Patient register |
| POST   | /api/auth/login    | Login all roles  |

### Doctors

| Method | Endpoint                | Access | Description      |
|--------|-------------------------|--------|------------------|
| GET    | /api/doctors            | Public | List all doctors |
| POST   | /api/admin/doctors      | Admin  | Add doctor       |
| PUT    | /api/admin/doctors/{id} | Admin  | Update doctor    |
| DELETE | /api/admin/doctors/{id} | Admin  | Delete doctor    |

### Appointments

| Method | Endpoint                                | Access  | Description           |
|--------|-----------------------------------------|---------|-----------------------|
| POST   | /api/patient/appointments               | Patient | Book appointment      |
| GET    | /api/patient/appointments               | Patient | My appointments       |
| PUT    | /api/patient/appointments/{id}/cancel   | Patient | Cancel appointment    |
| GET    | /api/doctor/appointments                | Doctor  | Doctor's appointments |
| PUT    | /api/doctor/appointments/{id}/status    | Doctor  | Approve or Reject     |
| GET    | /api/admin/appointments                 | Admin   | All appointments      |

---

## Features

### Patient
- Register and login
- View all available doctors
- Book appointment with a doctor
- View appointment history with status
- Cancel pending appointments

### Doctor
- Login
- View all appointments assigned
- Approve or Reject pending appointments

### Admin
- Login
- Add, update, delete doctors
- View all appointments across the system

---

## Notes

- JWT token is stored in `localStorage` on the frontend
- CORS is configured to allow `http://localhost:5173`
- `DataInitializer.java` seeds default admin and doctor accounts on startup
