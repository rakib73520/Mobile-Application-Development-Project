import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "library"
})

app.get('/fetchbooks', (req, res) => {
    const sql = "SELECT * FROM books";
    db.query(sql, (err, result)=> {
        if(err) return res.json({Messege: "Error inside the Server"});
        return res.json(result);
    })
})

app.delete("/deletebook/:id", (req, res) => {
    const { id } = req.params;
  
    const deleteBorrowQuery = "DELETE FROM borrow WHERE bookid = ?";
    const deleteBookQuery = "DELETE FROM books WHERE id = ?";
  
    db.query(deleteBorrowQuery, [id], (borrowErr, borrowResults) => {
      if (borrowErr) {
        console.error("Error deleting from borrow table:", borrowErr);
        return res.status(500).send("Error deleting related borrow records.");
      }
  
      db.query(deleteBookQuery, [id], (bookErr, bookResults) => {
        if (bookErr) {
          console.error("Error deleting book:", bookErr);
          return res.status(500).send("Error deleting book.");
        }
  
        if (bookResults.affectedRows === 0) {
          return res.status(404).send("Book not found.");
        }
  
        return res.status(200).send("Book and related borrow records deleted successfully.");
      });
    });
  });
  

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (`name`, `username`, `password`) VALUES (?)";
    console.log(req.body.studentName);
    console.log(req.body.username);
    
    
    const values = [
        req.body.studentName,
        req.body.username,
        req.body.password
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.post('/admincreate', (req, res) => {
    const sql = "INSERT INTO books (`name`, `author`, `count`) VALUES (?)";
    const values = [
        req.body.bookName,
        req.body.author,
        req.body.totalBooks
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get("/studentcheck/:username/:password", (req, res) => {
    const { username, password } = req.params;
  
    const query = "SELECT * FROM student WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error inside server" });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json(result[0]);
    });
});


app.get('/available-books', (req, res) => {
    const query = "SELECT * FROM books WHERE count > 0";
    
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching books' });
      }
      return res.json(result); 
    });
});

app.post('/borrow-book', (req, res) => {
    const { name, author, date, bookid, userid } = req.body;
  
    const checkQuery = `
      SELECT * FROM borrow 
      WHERE bookid = ? AND userid = ?
    `;
  
    const insertQuery = `
      INSERT INTO borrow (name, author, date, bookid, userid)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    const updateQuery = `
      UPDATE books 
      SET count = count - 1, 
          borrowed = borrowed + 1
      WHERE id = ?
    `;
  
    db.query(checkQuery, [bookid, userid], (checkErr, checkResult) => {
      if (checkErr) {
        return res.status(500).json({ message: 'Error checking borrow table', error: checkErr });
      }
  
      if (checkResult.length > 0) {
        return res.status(400).json({ message: 'Book Already Borrowed' });
      }
  
      db.query(insertQuery, [name, author, date, bookid, userid], (insertErr, insertResult) => {
        if (insertErr) {
          return res.status(500).json({ message: 'Error inserting into borrow table', error: insertErr });
        }
  
        db.query(updateQuery, [bookid], (updateErr, updateResult) => {
          if (updateErr) {
            return res.status(500).json({ message: 'Error updating books table', error: updateErr });
          }
  
          return res.status(200).json({ message: 'Book borrowed successfully!' });
        });
      });
    });
  });
  
  

app.get("/borrowed-books/:userId", (req, res) => {
    const userId = parseInt(req.params.userId, 10); 
  
    if (isNaN(userId)) {
      return res.status(400).send("Invalid userId");
    }
  
    const query = "SELECT * FROM borrow WHERE userid = ?";
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching borrowed books:", err);
        return res.status(500).send("Error fetching borrowed books.");
      }
  
      return res.status(200).json(results);
    });
  });

  app.get('/return-book/:bookId/:userId', (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);
  
    if (!bookId || !userId) {
      return res.status(400).json({ message: 'Invalid bookId or userId' });
    }
    console.log(bookId);
    console.log(userId);
    
    
  
    const deleteQuery = 'DELETE FROM borrow WHERE bookid = ? AND userid = ?';
    const updateQuery = 'UPDATE books SET count = count + 1, borrowed = borrowed - 1 WHERE id = ?';
  
    db.query(deleteQuery, [bookId, userId], (err, deleteResult) => {
      if (err) {
        console.error('Error deleting borrow record:', err);
        return res.status(500).json({ message: 'Error deleting borrow record' });
      }
  
      db.query(updateQuery, [bookId], (err, updateResult) => {
        if (err) {
          console.error('Error updating book record:', err);
          return res.status(500).json({ message: 'Error updating book record' });
        }

        console.log(deleteResult);
        console.log(updateResult);
        
        
  
        res.status(200).json({
          message: 'Book returned successfully. Borrow record deleted and book record updated.',
        });
      });
    });
  });
    
  

app.listen(8081, ()=> {
    console.log("Listening to port 8081");  
})