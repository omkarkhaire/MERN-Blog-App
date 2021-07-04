import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setusername] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [mydata, setmydata] = React.useState({});
  const handelsubmit = async (e) => {
    e.preventDefault();
    const responce = await axios.post("/auth/register", {
      username,
      email,
      password,
    });
    console.log(responce);
    setmydata(responce.data);
    if (responce.data.username && responce.data.password) {
      window.location.replace("/login");
    }
  };
  return (
    <div className="mincontainer">
      <h4 className="logintitel">Register</h4>
      <form className="loginform" onSubmit={handelsubmit} method="Post">
        <div className="collection">
          <label htmlFor="user" className="mylabel">
            Username
          </label>
          <input
            type="text"
            id="user"
            className="impinputsR"
            required
            placeholder="omkarkhaire90"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div className="collection">
          <label htmlFor="email" className="mylabel">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="impinputsR"
            required
            
            value={email}
            placeholder="omkarkhaire90@gmail.com"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="collection">
          <label htmlFor="pass" className="mylabel">
            Password
          </label>
          <input
            type="password"
            className="impinputsR"
            required
            placeholder="************"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        {mydata.msg && <span className="alert">{mydata.msg}</span>}

        <button type="submit" className="loginbutton">
          Register
        </button>
      </form>
      <button className="registerbutton">
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "18px",
            fontWeight: "300",
            margin: "0px 10px",
          }}
        >
          Login
        </Link>
      </button>
    </div>
  );
};

export default Register;
