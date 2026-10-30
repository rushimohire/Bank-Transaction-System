import { useState } from "react";
import API from "../../services/api";

const Profile = () => {

  const [pinData, setPinData] = useState({
    oldPin: "",
    newPin: ""
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });

  // PIN change
  const handleChangePin = async () => {
    try {
      await API.put("/transaction/change-pin", pinData);
      alert("PIN updated successfully");

      setPinData({ oldPin: "", newPin: "" });

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  // Password change
  const handleChangePassword = async () => {
    try {
      await API.put("/transaction/change-password", passwordData);
      alert("Password updated successfully");

      setPasswordData({ oldPassword: "", newPassword: "" });

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#0F172A] text-white">

      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Profile Settings 👤
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 🔐 Change PIN */}
        <div className="glass-card p-6 md:p-8">

          <h3 className="text-lg font-semibold mb-4">
            Change Transaction PIN
          </h3>

          <input
            type="password"
            placeholder="Old PIN"
            value={pinData.oldPin}
            onChange={(e) =>
              setPinData({ ...pinData, oldPin: e.target.value })
            }
            className="input-field mb-4"
          />

          <input
            type="password"
            placeholder="New PIN"
            value={pinData.newPin}
            onChange={(e) =>
              setPinData({ ...pinData, newPin: e.target.value })
            }
            className="input-field mb-6"
          />

          <button
            onClick={handleChangePin}
            className="btn-primary w-full"
          >
            Update PIN
          </button>

        </div>

        {/* 🔑 Change Password */}
        <div className="glass-card p-6 md:p-8">

          <h3 className="text-lg font-semibold mb-4">
            Change Password
          </h3>

          <input
            type="password"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                oldPassword: e.target.value
              })
            }
            className="input-field mb-4"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value
              })
            }
            className="input-field mb-6"
          />

          <button
            onClick={handleChangePassword}
            className="btn-primary w-full"
          >
            Update Password
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;