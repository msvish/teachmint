import "./App.css";
import { Routes, Route } from "react-router-dom";
import Directory from "./Components/Directory/directory";
import Profile from "./Components/Profile/profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Directory />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
