import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import AllProjects from './Components/AllProjects';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
      <AllProjects/>
    </div>
  );
}

export default App;
