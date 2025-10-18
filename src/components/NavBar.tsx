import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Brand / Home Link */}
      <Link
        to="/"
        className="text-2xl font-bold text-purple-700 hover:text-purple-900"
        aria-label="Go to home page"
      >
        NS Move
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6 items-center">
        <Link
          to="/user"
          className="text-gray-700 hover:text-purple-700 font-medium"
        >
          Find Rides
        </Link>
        <Link
          to="/driver"
          className="text-gray-700 hover:text-purple-700 font-medium"
        >
          Drive
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-purple-700 font-medium"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-purple-700 font-medium"
        >
          Contact Us
        </Link>

        <Link
          to="/auth"
          className="text-gray-700 hover:text-purple-700 font-medium"
        >
          Login
        </Link>

        {/* Profile Icon */}
        <button
          aria-label="Profile"
          className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full p-1 hover:bg-white hover:bg-opacity-20 transition-all"
          onClick={() => navigate('/profile')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700 hover:text-purple-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A12.042 12.042 0 0112 15.75a12.042 12.042 0 016.879 2.054M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
