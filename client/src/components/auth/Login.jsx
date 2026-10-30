
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful", {
        autoClose: 2000,
      });

      // 👉 delay navigation so toast can show
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#020617]">
    
      <div className="glass-card p-6 md:p-10 w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="input-field mb-4 text-sm md:text-base"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="input-field mb-6 text-sm md:text-base"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="btn-primary w-full text-sm md:text-base"
        >
          Login
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

export default Login;