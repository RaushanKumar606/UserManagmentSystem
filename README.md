# User Access Management System

A full-stack application for managing user access requests to software systems. Built with Node.js, Express, React, and PostgreSQL with TypeORM.

## Features

- **User Authentication**: Sign up, login with JWT
- **Role-Based Access Control**: Admin, Manager, and Employee roles
- **Software Management**: Admin can create, update, and delete software
- **Access Requests**: Employees can request access to software
- **Request Management**: Managers can approve or reject access requests


## Tech Stack

### Backend
- Node.js & Express.js
- PostgreSQL
- TypeORM
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React
- React Router
- React Bootstrap
- Axios

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/         # Database and environment configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware (auth, etc.)
│   │   ├── models/         # TypeORM entities
│   │   ├── routes/         # Express routes
│   │   └── index.js        # Entry point
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   │   ├── admin/      # Admin-specific pages
    │   │   ├── employee/   # Employee-specific pages
    │   │   └── manager/    # Manager-specific pages
    │   ├── services/       # API services
    │   ├── utils/          # Utility functions and context
    │   ├── App.js          # Main app component with routing
    │   └── index.js        # Entry point
    └── package.json        # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=user_access_management
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   ```

4. Create a PostgreSQL database:
   ```
   createdb user_access_management
   ```

5. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate a user

### Software Management
- `GET /api/software` - Get all software
- `GET /api/software/:id` - Get a specific software
- `POST /api/software` - Create new software (Admin only)
- `PUT /api/software/:id` - Update a software (Admin only)
- `DELETE /api/software/:id` - Delete a software (Admin only)

### Access Requests
- `POST /api/requests` - Create a new access request (Employee)
- `GET /api/requests/pending` - Get all pending requests (Manager only)
- `GET /api/requests/user` - Get current user's requests
- `PATCH /api/requests/:id` - Update request status (Manager only)

## Default User Roles

- **Employee**: Can sign up, login, request software access
- **Manager**: Can view and approve/reject access requests
- **Admin**: Can create software, has full access
