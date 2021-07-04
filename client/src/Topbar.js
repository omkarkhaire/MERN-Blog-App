import React, { useContext } from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaSearch,
} from "react-icons/fa";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { context } from "./context/context";
import image from "./assets/user.png";

const Topbar = () => {
  const { user, dispatch } = useContext(context);
  console.log(user);
  function handel_logout() {
    console.log("logout clicked");
    dispatch({ type: "Logout" });
  }
  const pf = "http://localhost:5000/images/";

  return (
    <div className="topbar">
      {/* left part */}
      <div className="topleft">
        <span className="icons">
          <FaFacebookSquare />
        </span>
        <span className="icons">
          <FaInstagram style={{ color: "red" }} />
        </span>
        <span className="icons">
          <FaLinkedin />
        </span>
      </div>

      {/* top center */}
      <div className="topcenter">
        <ul className="toplist">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <li className="toplistitem">HOME</li>
          </Link>
          <Link to="/about" style={{ textDecoration: "none", color: "black" }}>
            <li className="toplistitem">ABOUT</li>
          </Link>
          <Link to="/write" style={{ textDecoration: "none", color: "black" }}>
            <li className="toplistitem">WRITE</li>
          </Link>
          {user && (
            <Link style={{ textDecoration: "none", color: "black" }}>
              <li className="toplistitem" onClick={handel_logout}>
                LOGOUT
              </li>
            </Link>
          )}
        </ul>
      </div>

      {/* top right */}
      <div className="topright">
        {user ? (
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <img
              src={user.profilepicture > 1 ? pf + user.profilepicture : image}
              alt="user"
            />
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "18px",
                fontWeight: "300",
                margin: "0px 10px",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "18px",
                fontWeight: "300",
                margin: "0px 10px",
              }}
            >
              Register
            </Link>
          </>
        )}

        {/* <FaSearch className="searchicon" /> */}
      </div>
    </div>
  );
};

export default Topbar;
