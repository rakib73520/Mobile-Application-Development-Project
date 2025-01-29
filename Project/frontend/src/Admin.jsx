import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Admin = () => {

  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/deletebook/${id}`);
      setData(data.filter((book) => book.id !== id));
      alert(`Book with ID: ${id} has been deleted.`);
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete the book.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/fetchbooks');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>List of All Books</h2>
        <div className="d-flex justify-content-end">
        <Link to="/admincreate" className="btn btn-success" style={{ marginRight: "10px"}}>
            Create
          </Link>
          <Link to="/" className="btn btn-primary">
            Logout
          </Link>
        </div>
      </div>

      <table className="table table-bordered" style={{ width: "800px" }}>
        <thead style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Total Borrowed</th>
            <th>Current Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.borrowed}</td>
              <td>{book.count}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
