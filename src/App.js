import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './pages/Navbar';
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyNotes from './pages/MyNotes';
import Archieve from './pages/Archieve';
import ContactMe from './pages/ContactMe';
import RequireAuth from './pages/RouteProtection/RequireAuth';
import CheckUser from './pages/RouteProtection/CheckUser';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/login' element={<CheckUser>
          <Login></Login>
        </CheckUser>}></Route>
        <Route path='/register' element={<CheckUser>
          <Register></Register>
        </CheckUser>}></Route>
        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard></Dashboard>
        </RequireAuth>}>
          <Route index element={<MyNotes></MyNotes>}></Route>
          <Route path='archieve' element={<Archieve></Archieve>}></Route>
          <Route path='contact' element={<ContactMe></ContactMe>}></Route>
          <Route path='profile' element={<UserProfile></UserProfile>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
