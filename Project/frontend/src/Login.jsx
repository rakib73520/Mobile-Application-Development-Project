import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username === "admin" && formData.password === "admin") {  
      navigate('/admin')
    } else {
      axios
      .get(`http://localhost:8081/studentcheck/${formData.username}/${formData.password}`)
      .then((res) => {
        localStorage.setItem("student", JSON.stringify({
          id: res.data.id,
          name: res.data.name,
          username: res.data.username,
          password: res.data.password
        }));
        navigate("/studenthome");
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("User not found");
        } else {
          console.error("Error:", err);
        }
      });
    }
    
    setFormData({ username: "", password: "" });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Welcome To The Library Management App</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100 mb-2"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <Link to="/signup" className="btn btn-success w-100 mb-2">
            Sign Up
          </Link>
      </div>
    </div>
  );
};

export default Login;
