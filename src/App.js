import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import PDFRenderer from './PDFRenderer';
import PrintChart from './PrintChart';
import axios from "axios";

function App() {
  return (
    <div className = "container">
      <Routes>
        <Route path = "/pdf-viewer" element = {<PDFRenderer />} />
        <Route path = "/" element = {<PrintChart />} />
      </Routes>
    </div>
  );
}

export default App;
