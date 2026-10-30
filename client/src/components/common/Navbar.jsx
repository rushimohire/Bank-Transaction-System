import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 bg-[#31415b] backdrop-blur-lg border-b border-white/20">

        {/* Logo */}
        <h1 className="text-lg md:text-xl font-bold text-white">
          MyBank
        </h1>

        {/* Links */}
        <div className="flex items-center gap-3 md:gap-5 text-sm md:text-base">

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          {!token && (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn-secondary"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition"
              >
                 Balance
              </Link>

              <button
                onClick={handleLogout}
                className="btn-primary text-sm md:text-base"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </nav>

      <hr className="border-white/10" />
    </>
  );
};

export default Navbar;