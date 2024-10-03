// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ReactDOM from "react-dom";
import './App.css';
// import ChartPage from './pages/ChartPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/chart" component={ChartPage} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
