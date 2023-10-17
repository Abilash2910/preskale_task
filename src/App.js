import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddBird from "./components/AddBird";
import Bird from "./components/Bird";
import BirdsList from "./components/BirdList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/birds" className="navbar-brand">
            Bird App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/birds"} className="nav-link">
              Birds
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* <Route exact path={['/', '/birds']} element={<BirdsList />} /> */}
          <Route exact path='/' element={<BirdsList />} />
          <Route exact path='/birds' element={<BirdsList />} />
          <Route exact path='/add' element={<AddBird />} />
          <Route path='/birds/:id' element={<Bird />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;