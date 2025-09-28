import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../Hooks/useLogout";
import { useAuthContext } from "../../Hooks/useAuthContext";
import "./NavbarStyle.css";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClickLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      {/* WorkoutBuddy link */}
      <Link to={user ? "/home" : "/login"} className="nav-btn">
        WorkoutBuddy
      </Link>

      {/* Auth / User Section */}
      {user ? (
        <div className="logout">
          <span>{user.email}</span>
          <button onClick={handleClickLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

