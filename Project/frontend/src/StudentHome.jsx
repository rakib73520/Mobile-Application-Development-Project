import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const StudentHome = () => {
  const [studentName, setStudentName] = useState('');
  const [userId, setUserId] = useState('');
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {

    const storedStudent = JSON.parse(localStorage.getItem('student'));
    if (storedStudent && storedStudent.name) {
      setStudentName(storedStudent.name);
      setUserId(storedStudent.id);
    }

    axios.get('http://localhost:8081/available-books')
    .then((response) => {
        setAvailableBooks(response.data);
        })
    .catch((error) => {
        console.error("There was an error fetching the books:", error);
    });
  }, []);

  const handleBorrow = (bookId, bookName, bookAuthor) => {
    const currentDate = new Date().toISOString().split('T')[0];
  
    const borrowData = {
      name: bookName,
      author: bookAuthor,
      date: currentDate,
      bookid: bookId,
      userid: userId,
    };
  
    axios.post('http://localhost:8081/borrow-book', borrowData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.error('Error borrowing book:', error);
        }
      });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/')
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{width: "850px"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Library Management System</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/mybooks" className="nav-link" style={{marginRight: "50px"}}>My Books</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger btn-sm" onClick={handleLogout} style={{marginTop: "5px"}}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h3>Welcome, {studentName || 'Guest'}!</h3>
        <p>Here are the available books:</p>

        <div className="row">
          {availableBooks.map((book) => (
            <div key={book.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{book.name}</h5>
                  <p className="card-text">Author: {book.author}</p>
                  <button className="btn btn-primary" onClick={() => handleBorrow(book.id, book.name, book.author)}>
                    Borrow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
