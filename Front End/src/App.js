import './App.css';
import Login from './components/login/login';
import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from "react-router-dom";
// import {useSelector} from 'react-redux';

function App() {
  // const isAuth = useSelector(state => state.auth.isAuth);
  return (
    <Routes>
      <Route path="/Login" element={<Login/>}/> 
      <Route path="/Admin" element={<Dashboard/>}/> 
  </Routes>    
  );
}

export default App;
