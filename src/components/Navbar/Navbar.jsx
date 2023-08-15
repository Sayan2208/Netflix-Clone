import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [show, handleShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    // cleanup function
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <div className={`navbar ${show && "navbar__black"}`}>
      <div className="navbar__contents">
        <Link to="/">
        <img
          className="navbar__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="Netflix logo"
        />
        </Link>
        <Link to="/profile">
          <img
            className="navbar__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix avatar logo"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
