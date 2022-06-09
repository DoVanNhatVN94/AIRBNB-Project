/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../asset/css/login.css";
import { LoginAction } from "../../redux/Actions/XacThucNguoiDungAction";



 function Login() {
   
  let [user, setUserAccount] = useState({
    email: "",
    password: "",
  });
  
  const dispatch = useDispatch();

  

  const hanleInput = (event) => {
    let { value, name } = event.target;

    setUserAccount({
      ...user,
      [name]: value,
    });
    
  };

  const handleSubmit = (values) => {
    values.preventDefault();

    const { email, password } = values;
    setUserAccount({
      email: email,
      password: password,
    });
    dispatch(LoginAction(user));
  };

  return (
   
      <div className="login-box">
        <h2>SIGN IN</h2>
        <form
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          style={{ witdh: "100%" }}
        >
          <div className="user-box">
            <input
              defaultValue=""
              onChange={(event) => {
                hanleInput(event);
              }}
              type="email"
              name="email"
              required
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              defaultValue=""
              onChange={(event) => {
                hanleInput(event);
              }}
              type="password"
              name="password"
              required
            />
            <label>Password</label>
          </div>
          <div className="d-flex justify-content-between">
            <div className="btn_login">
              <button type="submit">
                <span />
                <span />
                <span />
                <span />
                Login
              </button>
            </div>
            <div className="register">
              <NavLink className=" custom-btn btn-register" to={'register'} >
                Register
              </NavLink>
            </div>
          </div>
        </form>
      </div>
  );
}

export default Login