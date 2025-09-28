import React from "react";
import "./FooterStyle.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} WorkoutBuddy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
