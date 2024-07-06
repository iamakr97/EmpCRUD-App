import React, { useState } from 'react';
import './EmployeeForm.css';
import axios from 'axios';

function EmployeeForm(props) {
    const { onDataUpdate, empData, setEmpData, isEditing, setIsEditing, id } = props;


    function empDataChangeHandeler(e) {
        setEmpData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    async function submitHandler(e) {
        e.preventDefault();
        if (empData.name === '' || empData.age === '' || empData.city === 0) {
            alert("Please Enter all details");
            return;
        }
        if (empData.age <= 0 || empData.age >= 100) {
            alert("Please Enter Correct Age");
            return;
        }
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/addUser`,
            {
                name: empData.name,
                city: empData.city,
                age: parseInt(empData.age)
            })
            .then((res) => {
                console.log(res);
                setEmpData({
                    name: '',
                    city: '',
                    age: 0
                })
                onDataUpdate();
            }).catch((error) => {
                console.log(error);
                alert("Enternal Sever Error", error.message);
            })
    }
    async function updatedHandler(e) {
        e.preventDefault();
        if (empData.name === '' || empData.age === '' || empData.city === 0) {
            alert("Please Enter all details");
            return;
        }
        if (empData.age <= 0 || empData.age >= 100) {
            alert("Please Enter Correct Age");
            return;
        }
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/updateUser/${id}`,
            {
                name: empData.name,
                city: empData.city,
                age: parseInt(empData.age)
            })
            .then((res) => {
                console.log(res);
                setEmpData({
                    name: '',
                    city: '',
                    age: 0
                })
                setIsEditing(false);
                onDataUpdate();
            }).catch((error) => {
                console.log(error);
                alert("Enternal Sever Error", error.message);
            })
    }

    return (
        <div className='emp-form-container'>
            <form onSubmit={isEditing ? updatedHandler : submitHandler}>
                <div>
                    <label htmlFor="name">Enter Your Name</label>
                    <input type="text" name="name" id="name" value={empData.name} onChange={empDataChangeHandeler} />
                </div>
                <div>
                    <label htmlFor="city">Enter Your city</label>
                    <input type="text" name="city" id="city" value={empData.city} onChange={empDataChangeHandeler} />
                </div>
                <div>
                    <label htmlFor="age">Enter Your age</label>
                    <input type="number" name="age" id="age" value={empData.age} onChange={empDataChangeHandeler} />
                </div>
                <div>
                    {isEditing
                        ?
                        <button type='submit'>Update</button>
                        :
                        <button type='submit'>Submit</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default EmployeeForm;