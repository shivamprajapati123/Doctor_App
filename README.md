# DocAPP - Healthcare Appointment Management System

DocAPP is a comprehensive healthcare appointment management system built with React, Node.js, and MongoDB. It facilitates seamless interaction between patients, doctors, and administrators.

## Features

### For Patients
- Book appointments with specialists
- View doctor profiles and specialties
- Access medical test information
- Track appointment history
- Chat with AI-powered Dr.GPT assistant
- Secure payment integration with Razorpay
- Manage personal profile

### For Doctors
- Manage availability status
- View appointment schedules
- Update profile information
- Track patient appointments
- Access dashboard analytics

### For Administrators
- Add and manage doctors
- Monitor appointments
- View system analytics
- Manage user accounts
- Access administrative dashboard

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Context API
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary (Image Storage)
- Python/Flask (Chatbot)

### Admin Panel
- React.js
- Tailwind CSS
- Context API
- Protected Routes

## Project Structure
DocAPP/
├── Frontend/ # Patient/User interface
├── Backend/ # Server and API
└── admin/ # Admin dashboard

## Setup Instructions

1. Clone the repository
```bash
git clone <https://github.com/shivamprajapati123/Doctor_App

2.Install dependencies for each directory
# Frontend
cd Frontend
npm install

# Backend
cd Backend
npm install

# Admin
cd admin
npm install


3.Configure environment variables
Create .env files in Frontend, Backend, and admin directories
Add necessary environment variables (DB connection, API keys, etc.)

4.Start the development servers
# Frontend
cd Frontend
npm run dev

# Backend
cd Backend
npm run server

# Admin
cd admin
npm run dev


