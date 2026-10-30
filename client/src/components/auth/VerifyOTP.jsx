import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = () => {
  const naviget = useNavigate();

  const [data, setData] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleVerify = async () => {
    try {
      const res = await API.post("/auth/verify-otp", data);

      localStorage.setItem("token", res.data.token);

       toast.success("Account verified", {
        autoClose: 2000,
      }); 
    
      setTimeout(() => {
        naviget('/login');
      }, 2000);
    

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#020617]">

      <div className="glass-card p-6 md:p-10 w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Verify OTP 🔐
        </h2>

        {/* Email */}
        <input
          name="email"
          onChange={handleChange}
          placeholder="Enter Email"
          className="input-field mb-4 text-sm md:text-base"
        />

        {/* OTP */}
        <input
          name="otp"
          onChange={handleChange}
          placeholder="Enter OTP"
          className="input-field mb-6 text-sm md:text-base text-center tracking-widest"
        />

        {/* Button */}
        <button
          onClick={handleVerify}
          className="btn-primary w-full text-sm md:text-base"
        >
          Verify Account
        </button>

      </div>
    
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

export default VerifyOTP;