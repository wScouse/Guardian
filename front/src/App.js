// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Report from './pages/Report';
import Home from './pages';

function App() {
  console.log('App started');
  return (
    <Router>
      <Routes>
        < Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
};




export default App;
