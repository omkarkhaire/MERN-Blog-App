import React, { useRef, useContext, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { context } from "../context/context";
import axios from "axios";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [errorersponce, seterrorresponce] = React.useState("");
  const { dispatch, isfetching } = useContext(context);

  const handelsubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "Login_start" });
    try {
      console.log(email.current.value);
      const responce = await axios.post("/auth/login", {
        email: email.current.value,
        password: password.current.value,
      });
      console.log("from login=", responce);
      if (responce.data.username) {
        dispatch({ type: "Login_success", payload: responce.data });
      }
      seterrorresponce(responce.data);
    } catch (error) {
      dispatch({ type: "Login_fail" });
    }
  };

  return (
    <div className="mincontainerL">
      <h4 className="logintitel">Login</h4>
      <form className="loginformlogin" onSubmit={handelsubmit}>
        <div className="collection">
          <label htmlFor="email" className="mylabel">
            Email
          </label>
          <input
            type="email"
            className="impinputsL"
            required
            placeholder="omkarkhaire90@gmail.com"
            ref={email}
          />
        </div>
        <div className="collection">
          <label htmlFor="pass" className="mylabel">
            Password
          </label>
          <input
            type="password"
            className="impinputsL"
            required
            placeholder="************"
            ref={password}
          />
        </div>
        {errorersponce && <div className="error">{errorersponce}</div>}

        <button type="submit" className="loginbutton" disabled={isfetching}>
          Login
        </button>
      </form>

      <button className="registerbuttonL">
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "18px",
            fontWeight: "300",
            margin: "0px 10px",
          }}
        >
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
