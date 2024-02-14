import './App.css';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Main from './pages/Main'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useState } from 'react';

function App() {

  const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('rasyueToken');
    return token ? children : <Navigate to="/login" />;
  };

  const [dogID, setDogID] = useState(null)

  return (
    <Routes>

      <Route path="/" element={<Welcome />} />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* MAIN */}
      <Route path="/main" element={<RequireAuth><Main page={'main'} /></RequireAuth>} />
      <Route path="/main" element={<RequireAuth><Main page={'main-carousel'} /></RequireAuth>} />

      {/* RESERVATION */}
      <Route path="/reservation" element={<RequireAuth><Main page={'reservation'} /></RequireAuth>} />

      {/* STRAYDOG */}
      <Route path="/straydog" element={<RequireAuth><Main page={'straydog'} /></RequireAuth>} />
      <Route path="/straydog-detail/:id" element={<RequireAuth><Main page={'straydog-detail'} /></RequireAuth>} />
      <Route path="/straydog-guide" element={<RequireAuth><Main page={'straydog-guide'} /></RequireAuth>} />
      <Route path="/straydog-success" element={<RequireAuth><Main page={'straydog-success'} /></RequireAuth>} />
      <Route path="/straydog-fail" element={<RequireAuth><Main page={'straydog-fail'} /></RequireAuth>} />

      {/* LOSTDOG */}
      <Route path="/lostdog" element={<RequireAuth><Main page={'lostdog'} /></RequireAuth>} />
      <Route path="/lostdog-detail/:id" element={<RequireAuth><Main page={'lostdog-detail'} /></RequireAuth>} />
      <Route path="/lostdog/create" element={<RequireAuth><Main page={'lostdog-create'} /></RequireAuth>} />
      <Route path="/lostdog/update/:id" element={<RequireAuth><Main page={'lostdog-update'} /></RequireAuth>} />

      {/* REMOTEPLAY */}
      <Route path="/remoteplay" element={<RequireAuth><Main page={'remoteplay'} /></RequireAuth>} />
      <Route path="/remoteplay-guide" element={<RequireAuth><Main page={'remoteplay-guide'} /></RequireAuth>} />
      <Route path="/recommenddog" element={<RequireAuth><Main page={'recommenddog'} /></RequireAuth>} />

      {/* NAVBAR */}
      <Route path="/aboutus" element={<RequireAuth><Main page={'aboutus'} /></RequireAuth>} />
      <Route path="/ucc" element={<RequireAuth><Main page={'ucc'} /></RequireAuth>} />
      <Route path="/mypage" element={<RequireAuth><Main page={'mypage'} /></RequireAuth>} />

      {/* ADMIN */}
      <Route path="/admin/create" element={<RequireAuth><Main page={'admin-create'} /></RequireAuth>} />
      <Route path="/admin/update/:id" element={<RequireAuth><Main page={'admin-update'} /></RequireAuth>} />
      <Route path="/admin/reservation" element={<RequireAuth><Main page={'admin-reservation'} /></RequireAuth>} />
      <Route path="/admin/dog" element={<RequireAuth><Main page={'admin-dog'} /></RequireAuth>} />
      <Route path="/admin/user" element={<RequireAuth><Main page={'admin-user'} /></RequireAuth>} />
    </Routes>





    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
