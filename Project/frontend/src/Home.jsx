import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

const Home = () => {
    const [data, setData] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounded p-3">
        <h2>Student List</h2>
        <table>
                <thead>
                <tr>
                    <th>Name : </th>
                    <th>Student ID : </th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        data.map((student, index) => {
                            return <tr key = {index}>
                                <td>{student.name}</td>
                                <td>{student.studentid}</td>
                                <td>
                                    <button className='btn btn-sm btn-info'>Read</button>
                                    <button className='btn btn-sm btn-primary mx-2'>EDIT</button>
                                    <button className='btn btn-sm btn-danger'>DELETE</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
        </table>
    </div>
    </div>
  );
};

export default Home;
