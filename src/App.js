import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import AllProjects from './Components/AllProjects';
import { Route, Routes } from 'react-router-dom';
import ProjectDetail from './Components/ProjectDetail';
import Bottomnav from './Components/Bottomnav';
import PostNew from './Components/PostNew';
import Assigned from './Components/Assigned';
import Register from './Components/Register';
import Posted from './Components/Posted';
import AssignedProject from './Components/AssignedProject';
import MyProjectDetails from './Components/MyProjectDetails';
import { getAddress, init } from "./web3/Web3Client";
import { useEffect, useState, useLayoutEffect } from 'react';

function App() {
  const [address, setAddress] = useState()
  useLayoutEffect(() => {
    connectMM()
  }, [])

  const connectMM = async() => {
try{
  // init();
  await window.ethereum.enable();
  const Address = await window.ethereum.selectedAddress
  setAddress(Address)
  console.log("address",Address)
}
catch(e){
  console.log(e)
}
  }
  
  return (
    <div className="App">
      <Navbar connect={connectMM} add={address}/>
      <Bottomnav/>
        <div className='globalContainer'>
      <Routes>
          <Route path='/' element={<AllProjects/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='myassignments' element={<Assigned/>}/>
          <Route path='/myassignments/assigned' element={<AssignedProject/>}/>
          <Route path='/createpost' element={<PostNew  add={address}/>}/>
          <Route path='/myprojects' element={<Posted/>}/>
          <Route path='/myprojects/project' element={<MyProjectDetails/>}/>
          <Route path='/project/:id' element={<ProjectDetail/>}/>
      </Routes>
        </div>
    </div>
  );
}

export default App;
