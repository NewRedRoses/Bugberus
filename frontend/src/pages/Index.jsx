import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

import App from "../App.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Project from "./Project.jsx";
import NavBar from "../components/Navbar.jsx";

export default function Index() {
  return (
    <div className="container">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<App />} />
        <Route path="/project/:projectId" element={<Project />} />
      </Routes>
    </div>
  );
}
