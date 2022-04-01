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

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Bottomnav/>
        <div className='globalContainer'>
      <Routes>
          <Route path='/' element={<AllProjects/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/myassignments' element={<Assigned/>}/>
          <Route path='/createpost' element={<PostNew/>}/>
          <Route path='/myprojects' element={<Posted/>}/>
          <Route path='/detail' element={<ProjectDetail/>}/>
      </Routes>
        </div>
    </div>
  );
}

export default App;
