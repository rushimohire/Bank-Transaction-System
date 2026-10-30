import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import VerifyOTP from "./components/auth/VerifyOTP";

import Deposit from "./components/dashboard/Deposit";
import SendMoney from "./components/dashboard/SendMoney";
import TransactionHistory from "./components/dashboard/TransactionHistory";

import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Profile from "./components/dashboard/Profile";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >

          {/* Nested Routes */}
          <Route path="deposit" element={<Deposit />} />
          <Route path="send" element={<SendMoney />} />
          <Route path="history" element={<TransactionHistory />} />
          <Route path="profile" element={<Profile/>} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;