import { useState } from 'react';
import './App.css';
import AllEmpData from './components/AllEmpData';
import EmployeeForm from './components/EmployeeForm';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId]=useState();
  const [empData, setEmpData] = useState({
    name: '',
    city: '',
    age: 0
  })
  const [update, setUpdate] = useState(false);

  const handleDataUpdate = () => {
    setUpdate(!update);
  };
  return (
    <div className="App">
      <h2>Employee Data CRUD</h2>
      <div>
        <EmployeeForm onDataUpdate={handleDataUpdate} empData={empData} setEmpData={setEmpData} isEditing={isEditing} id={id} setIsEditing={setIsEditing} />
        <AllEmpData update={update} setEmpData={setEmpData} setIsEditing={setIsEditing} setId={setId} />
      </div>
    </div>
  );
}

export default App;
