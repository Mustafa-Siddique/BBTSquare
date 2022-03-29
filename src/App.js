import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import AllProjects from './Components/AllProjects';
import { Route, Routes } from 'react-router-dom';
import ProjectDetail from './Components/ProjectDetail';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
        <div style={{marginLeft:"270px"}}>
      <Routes>
          <Route path='/' element={<AllProjects/>}/>
          <Route path='/detail' element={<ProjectDetail/>}/>
      </Routes>
        </div>
    </div>
  );
}

export default App;
