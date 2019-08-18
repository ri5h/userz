import React from 'react';
import './App.css';
import Topbar from './components/topbar';
import Users from './components/users';

function App() {
  return (
    <div>
      <Topbar></Topbar>
      <div className="col col-6 my-2"><Users /></div>
      <div className="sm-6"></div>
    </div>
  );
}

export default App;
