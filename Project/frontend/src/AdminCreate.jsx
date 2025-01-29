import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminCreate = () => {
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    totalBooks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/admincreate', formData)
    .then(res => console.log(res))
    .catch(err => console.log(err));
    console.log("Form Data:", formData);
    alert("Book Created Successfully!");
    setFormData({ bookName: "", author: "", totalBooks: "" });
    navigate('/admin')
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "600px" }}>
        <h3 className="text-center mb-4">Create Book</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bookName" className="form-label">
              Book Name
            </label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="totalBooks" className="form-label">
              Total Books
            </label>
            <input
              type="number"
              className="form-control"
              id="totalBooks"
              name="totalBooks"
              value={formData.totalBooks}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreate;
