
import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const naviget = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    transactionPin: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/register", form);
      console.log(res.data);

      toast.success("OTP sent to email", {
        autoClose: 2000,
      });

      setTimeout(() => {
        naviget("/VerifyOTP");
      }, 2000);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#020617]">
      <div className="glass-card p-6 md:p-10 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Name */}
        <input
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
          className="input-field mb-4 text-sm md:text-base"
        />

        {/* Email */}
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="input-field mb-4 text-sm md:text-base"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="input-field mb-4 text-sm md:text-base"
        />

        {/* Confirm Password */}
        <input
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          placeholder="Confirm Password"
          className="input-field mb-4 text-sm md:text-base"
        />

        {/* Transaction PIN */}
        <input
          name="transactionPin"
          type="password"
          onChange={handleChange}
          placeholder="Transaction PIN"
          className="input-field mb-6 text-sm md:text-base"
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="btn-primary w-full text-sm md:text-base"
        >
          Register
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Register;
