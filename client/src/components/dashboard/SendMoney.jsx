
import { useState } from "react";
import API from "../../services/api";

const SendMoney = () => {
  const [data, setData] = useState({
    receiverEmail: "",
    amount: "",
    transactionPin: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    try {
      const res = await API.post("/transaction/send", {
        ...data,
        amount: Number(data.amount)
      });

      alert(res.data.message);

      

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 px-4">
      
      <div className="glass-card p-6 md:p-8 w-full max-w-200">

        <h2 className="section-title text-center">
          Send Money
        </h2>

       {/* Receiver Email */}
        <label className="text-sm text-gray-300">Receiver Email</label>
        <input
          name="receiverEmail"
          onChange={handleChange}
          placeholder="example@gmail.com"
          className="input-field mb-4 mt-1"
        />

         {/* Amount */}
        <label className="text-sm text-gray-300">Amount</label>
        <input
          name="amount"
          onChange={handleChange}
          placeholder="₹ Enter amount"
          className="input-field mb-4 mt-1"
        />

        {/* PIN */}
        <label className="text-sm text-gray-300">Transaction PIN</label>
        <input
          name="transactionPin"
          onChange={handleChange}
          placeholder="••••"
          type="password"
          className="input-field mb-6 mt-1 text-center tracking-widest"
        />

        {/* Button */}
        <button
          onClick={handleSend}
          className="btn-primary w-full text-sm md:text-base"
        >
          Send Money
        </button>

      </div>

    </div>
  );
};

export default SendMoney;