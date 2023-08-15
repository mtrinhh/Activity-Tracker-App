import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar';
import ActivitiesList from './components/ActivitiesList';
import EditActivity from './components/EditActivity'; 
import CreateActivity from './components/CreateActivity';
import CreateUser from './components/CreateUser';

function App() {
  return (
      <div className="container">
      <Navbar />
      <br />
        <Routes>
          <Route path="/" element={<ActivitiesList />} />
          <Route path="/edit/:id" element={<EditActivity />} />
          <Route path="/create" element={<CreateActivity />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
  );
}

export default App;
