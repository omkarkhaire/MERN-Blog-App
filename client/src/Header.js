import React from "react";
import image from "./assets/auth.jpg";
import "./Header.css";

const Header = () => {
  return (
    <div className="mainheader">
      <div className="headertitel">
        <span className="headertitel1">React & Nodejs</span>
        <span className="headertitel2">Blog</span>
      </div>
      <img src={image} alt="some image" className="headerimg" />
    </div>
  );
};

export default Header;
