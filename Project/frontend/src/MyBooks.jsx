import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      const { id } = JSON.parse(storedStudent);
      setUserId(id);

      axios
        .get(`http://localhost:8081/borrowed-books/${id}`)
        .then((response) => {
          setBorrowedBooks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching borrowed books:", error);
          alert("Error fetching borrowed books");
        });
    }
  }, []);

  const handleReturn = async (bookId) => {
    try {
      if (!userId) {
        alert("User not logged in!");
        return;
      }
      const response = await axios.get(`http://localhost:8081/return-book/${bookId}/${userId}`);
      console.log('Server response:', response.data); 
      setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId));
      alert('Book returned successfully!');
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Failed to return book.');
    }
  };

  const handleBack = () => {
    navigate('/studenthome'); 
  };

  return (
    <div className="container mt-0" style={{ width: "900px", marginBottom: "200px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>List of Your Borrowed Books</h3>
        <button className="btn btn-secondary" onClick={handleBack}>
          <i className="bi bi-arrow-left-circle"></i> Back
        </button>
      </div>

      <table className="table table-striped table-hover shadow-lg rounded">
        <thead className="bg-light text-center">
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Borrowed Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.length > 0 ? (
            borrowedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{new Date(book.date).toLocaleDateString()}</td>
                <td className="text-center">
                  <button className="btn btn-primary btn-sm" onClick={() => handleReturn(book.bookid)}>
                    Return
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No borrowed books found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
