import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <img src={`${process.env.PUBLIC_URL}/assets/emotion1.png`} alt="감정1" />
        <img src={`${process.env.PUBLIC_URL}/assets/emotion2.png`} alt="감정2" />
        <img src={`${process.env.PUBLIC_URL}/assets/emotion3.png`} alt="감정3" />
        <img src={`${process.env.PUBLIC_URL}/assets/emotion4.png`} alt="감정4" />
        <img src={`${process.env.PUBLIC_URL}/assets/emotion5.png`} alt="감정5" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
