import { useEffect, useState } from "react";
import API from "../services/api";
import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {

  const [balance, setBalance] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false); // toggle
  //const [user, setUser] = useState(null); // get login user name 

  useEffect(() => {

    const fetchData = async () => {
      try {
        const balanceRes = await API.get("/transaction/balance");
        setBalance(balanceRes.data.balance);

        const notifRes = await API.get("/notifications");
        setNotifications(notifRes.data);
      
        await fetchData();

        

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6 hidden md:block">

        <h2 className="text-xl font-bold mb-8">MyBank</h2>

        <nav className="flex flex-col gap-4">

          <Link to="deposit" className="btn-secondary text-left">
            Deposit
          </Link>

          <Link to="send" className="btn-secondary text-left">
            Send Money
          </Link>

          <Link to="history" className="btn-secondary text-left">
            History
          </Link>

          <Link to="profile" className="btn-secondary text-left">
            Profile
          </Link>

        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-4 md:p-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">

          
          <h2 className="text-2xl font-bold">Dashboard</h2>

           
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="btn-secondary"
            >
              Notifications ({notifications.length})
            </button>

            {/* Dropdown */}
            {showNotif && (
              <div className="absolute right-0 mt-2 w-72 glass-card p-4 max-h-60 overflow-y-auto z-50">

                {notifications.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No notifications
                  </p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className="border-b border-white/10 py-2 text-sm"
                    >
                      {item.message}
                    </div>
                  ))
                )}

              </div>
            )}
          </div>

        </div>

        {/* Balance */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-gray-400 text-sm mb-2">Total Balance</h3>
          <h2 className="text-2xl md:text-3xl font-bold text-green-400">
            ₹{balance}
          </h2>
        </div>

        {/* Mobile Buttons (Sidebar alternative) */}
        <div className="flex md:hidden gap-3 mb-6 flex-wrap">
          <Link to="deposit" className="btn-primary text-sm">Deposit</Link>
          <Link to="send" className="btn-primary text-sm">Send</Link>
          <Link to="history" className="btn-secondary text-sm">History</Link>
          <Link to="profile" className="btn-secondary text-sm">Profile</Link>
        </div>

        {/* Routes */}
        <Outlet />

      </div>

    </div>
  );
};

export default Dashboard;