
# Bank Transaction System

A Full Stack Bank Transaction Management Application built using the MERN Stack.

## Project Overview

Bank Transaction System is a web application that allows users to create accounts, verify their email using OTP, log in securely, and manage basic banking transactions.

## Features

- User Registration
- Email OTP Verification
- Secure User Login
- User Dashboard
- Account Balance Display
- Deposit Money
- Send Money
- Transaction History
- User Profile Management
- Change Password
- Logout

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose

### Security
- JWT Authentication
- Password Hashing with bcrypt
- Email OTP Verification

## Project Structure

    Bank-Transaction-System/
    ├── client/
    ├── server/
    └── README.md

## Installation and Setup

### 1. Clone the Repository

    git clone https://github.com/rushimohire/Bank-Transaction-System.git

### 2. Frontend Setup

    cd client
    npm install
    npm run dev

### 3. Backend Setup

Open another terminal:

    cd server
    npm install
    npm run dev

## Environment Variables

Create a `.env` file inside the server folder.

Add the required environment variables:

    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_email_app_password

Use your actual variable names from the backend code. Never upload real credentials to GitHub.

## Future Improvements

- Improved transaction security
- Transaction limits
- Admin dashboard
- Enhanced validation and error handling

## Author

Rushikesh Mohire

GitHub: https://github.com/rushimohire

Portfolio: https://rushikeshmohire.github.io/MY-PORTFOLIO-WEBSITE/
