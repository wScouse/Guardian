// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Request from './pages/Request';
import Report from './pages/Report';
import Guardian from './pages/Guardian';
import Detections from './pages/Detections';
import Configure from './pages/Configure';
import Reports from './pages/Reports';
import Requests from './pages/Requests';
import Guide from './pages/Guide';
import Home from './pages';

function App() {
  console.log('App started');
  return (
    <Router>
      <Routes>
        < Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<Request />} />
        <Route path="/report" element={<Report />} />
        <Route path="/guardian" element={<Guardian />} />
        <Route path="/detections" element={<Detections />} />
        <Route path="/configure" element={<Configure />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </Router>
  );
};




export default App;
