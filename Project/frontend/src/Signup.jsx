import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/student', formData)
    .then(res => console.log(res))
    .catch(err => console.log(err));
    alert("Signup successful!");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Student Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              Student Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
