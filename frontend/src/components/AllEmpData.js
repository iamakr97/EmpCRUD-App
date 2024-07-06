import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AllEmpData.css';

function AllEmpData(props) {
    const { update, setEmpData, setIsEditing, setId } = props;

    const [empdata, setEmpdata] = useState();

    async function fetchEmpData() {
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getAllUser`)
            .then((res) => {
                console.log(res.data);
                setEmpdata(res.data);
            }).catch((error) => {
                console.log(error);
                alert("Internal Server Error", error.message);
            })
    }
    async function deleteEmpData(id) {
        console.log(id);
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/deleteUser/${id}`)
            .then((res) => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            })
        fetchEmpData();
    }
    useEffect(() => {
        fetchEmpData();
    }, [update]);
    function editHandler(emp) {
        setEmpData(emp);
        setId(emp.id);
        setIsEditing(true);
        console.log(emp);
    }
    return (
        <div>
            <h3 id='all-emp-data'>All EMP Data</h3>
            {(empdata) &&
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empdata.map((emp) => {
                                return <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.city}</td>
                                    <td>{emp.age}</td>
                                    <td>
                                        <button className='edit-btn' onClick={() => editHandler(emp)}>Edit</button>
                                        <button className='edit-btn' onClick={() => deleteEmpData(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    );
}

export default AllEmpData;