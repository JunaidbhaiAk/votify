import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoutes from './components/AuthRoutes';
import { AuthContext } from "./context/AuthContext";
import CandidateReg from './pages/CandidateReg';
import Dashboard from './pages/Dashboard';
import Election from './pages/Election';
import ElectionReg from './pages/ElectionReg';
import HomeLayout from './pages/HomeLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import ViewElection from './pages/ViewElection';
import Votes from './pages/Votes';
import { connectWallet } from './utils/web3';
const App = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    connectWallet().then(data => console.log(data))
  },[])
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
    <div style={{minHeight:'100vh'}}>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route element={<Homepage />} path='/' />
          <Route element={<Votes />} path='/voting' />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<AuthRoutes children={<MainLayout />} />}>
          <Route element={<Dashboard />} path='/dashboard' />
          <Route element={<CandidateReg />} path='/regCandidate' />
          <Route element={<ElectionReg />} path='/regElection' />
          <Route element={<ViewElection />} path='/viewElection' />
        </Route>
        <Route element={<Election />} path='/ele/:id' />
      </Routes>
    </div>
    </AuthContext.Provider>
  );
};
export default App;