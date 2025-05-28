import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import app from './firebase'
import Auth from './pages/Auth';
import HabitList from './pages/HabitList';
import CreateHabit from './pages/CreateHabit';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';


function App() {
  console.log("Firebase app initialized:", app);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<PrivateRoute><HabitList/></PrivateRoute>}/>
        <Route path="/create" element={<PrivateRoute><CreateHabit/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;
