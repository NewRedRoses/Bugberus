import { useNavigate } from "react-router";
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
      <NavLink to="/home">
        <House className="flex self-center" />
      </NavLink>

      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
}
