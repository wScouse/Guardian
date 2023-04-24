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
import Admin from './pages/Admin';
import Guide from './pages/Guide';
import Home from './pages';
import Missing_Report from './pages/Missing_Report';
import Detection_Report from './pages/Detection_Report';

function App() {
  console.log('App started');
  return (
    <Router>
      <Routes>
        < Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<Request />} />
        {/* <Route path="/report/:id" exact element={<Report />} /> */}
        <Route path="/report" element={<Report />} />
        <Route path="/guardian" element={<Guardian />} />
        <Route path="/detections" element={<Detections />} />
        <Route path="/configure" element={<Configure />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/missing_report/:id" element={<Missing_Report />} />
        <Route path="/detection_report/:id" element={<Detection_Report />} />
      </Routes>
    </Router>
  );
};




export default App;
