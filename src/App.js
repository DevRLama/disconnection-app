import './App.css';
import {useState} from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Alert from './components/Alert'


import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import WorkAssign from './components/WorkAssign';
import AddLineman from './components/AddLineman';
import DeleteLineman from './components/DeleteLineman';
import UpdateLineman from './components/UpdateLineman';
import WorkAssigned from './components/WorkAssigned';



function App() {

  const [alert, setalert] = useState(null)
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },1500)
  }
  return (
    <>
      <div className='container-fluid'>
        <img src="uppcl_logo.png" alt="" srcset="" />
      </div>
      <Router>
        <Navbar title="Disconnection Portal" showAlert={showAlert} />
        {/* <Sidebar></Sidebar> */}
        <Alert alert={alert}/>
      
        <div className="container mm">
          <Routes>
            <Route exact path="/" element={<SignIn showAlert={showAlert} />} />  
         
            <Route exact path="/profile" element={<HomePage showAlert={showAlert} />} />
            <Route exact path="/workAssign" element={<WorkAssign showAlert={showAlert} />} />
            <Route exact path="/addLineman" element={<AddLineman showAlert={showAlert} />} />
            <Route exact path="/deleteLineman" element={<DeleteLineman showAlert={showAlert} />} />
            <Route exact path="/updateLineman" element={<UpdateLineman showAlert={showAlert} />} />
            <Route exact path="/workAssigned" element={<WorkAssigned showAlert={showAlert} />} />

            
            
          </Routes>
          </div>
         
          {/* <div className="card-footer bg-transparent border-success"><FootBar mode={mode} /></div> */}
      </Router>
    


     
    </>
  );
}

export default App;

