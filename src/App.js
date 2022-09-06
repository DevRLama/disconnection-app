import './App.css';
import {useState} from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Alert from './components/Alert'


import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Sidebar from './components/Sidebar';


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
      <Router>
        <Navbar title="Disconnection Portal" showAlert={showAlert} />
        {/* <Sidebar></Sidebar> */}
        <Alert alert={alert}/>
      
        <div className="container mm">
          <Routes>
            <Route exact path="/" element={<SignIn showAlert={showAlert} />} />  
         
            <Route exact path="/profile" element={<HomePage showAlert={showAlert} />} />
            
            
          </Routes>
          </div>
         
          {/* <div className="card-footer bg-transparent border-success"><FootBar mode={mode} /></div> */}
      </Router>
    


     
    </>
  );
}

export default App;

