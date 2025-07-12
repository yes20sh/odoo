import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // ✅ correct path & casing
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Optional: send logout request to backend
    setUser(null);
    // Optionally clear localStorage/cookies if used
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-3">
        <button className="text-gray-700 md:hidden">
          <FaBars size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://storage.googleapis.com/a1aa/image/6b55d6db-c68f-4f59-f642-0b7b76cefd9f.jpg"
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="font-semibold text-lg">Skill Swap Platform</h1>
        </Link>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        <Link to="/">Home</Link>
        <Link to="/my-requests">Swap Request</Link>
      </div>

      {/* Right: User Info or Auth Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/profile">
              <img
                src={user.profilePhoto || 'https://via.placeholder.com/40'}
                alt="Profile"
                className="w-8 h-8 rounded-full border"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-red-600 hover:underline font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
