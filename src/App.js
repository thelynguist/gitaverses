import React from "react";
import Welcome from "./welcome/welcome.js";
import Selection from "./selection/selection.js";
import Gita from "./Gita/Gita.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Write from "./Gita/Write";
import Read from "./Gita/Read.js";
import UpdateRead from "./Gita/UpdateRead.js";
import "./Gita/gita.css";

//import data from "./gita_verses.json";

export default function App() {
  return (
    <div className="container">
      <Welcome />
      <Selection />
      <Gita />
      <Router>
        <Routes>
          <Route path="/" element={<Write />} />
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
          <Route path="/updateread" element={<UpdateRead />} />
        </Routes>
      </Router>
    </div>
  );
}
