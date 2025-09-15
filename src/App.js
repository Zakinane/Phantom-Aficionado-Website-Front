import "./App.css";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Phorums from "./pages/Phorums/Phorums";
import TEST from "./pages/TEST";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Authentication" element={<Auth />} />
          <Route path="/Phorum" element={<Phorums />} />

          <Route path="/TEST" element={<TEST />} />
          <Route
            path="*"
            element={<div style={{ color: "white" }}>ERROR 404</div>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
