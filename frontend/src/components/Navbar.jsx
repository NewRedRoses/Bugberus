import { Link, useNavigate } from "react-router-dom";
import { House } from "lucide-react";

import NavLink from "./NavLink.jsx";
import Button from "./Button.jsx";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    navigate("/login");
  };

  return (
    <div className="flex justify-between text-slate-700">
      <NavLink to="/home" className="bg-transparent">
        <House />
      </NavLink>

      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
}
