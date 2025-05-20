import { useNavigate, useLocation } from "react-router";
import { House } from "lucide-react";

import NavLink from "./NavLink.jsx";
import Button from "./Button.jsx";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    navigate("/login");
  };

  const shouldNavbarBeHidden = (path, noNavbarRoutes) => {
    return noNavbarRoutes.some((element) => path === element);
  };

  const routesWithoutNavbar = ["/login", "/signup"];

  return (
    <>
      {shouldNavbarBeHidden(currentPath, routesWithoutNavbar) == false ? (
        <div className="container flex justify-between px-10 text-slate-700">
          <NavLink to="/home" classNames="p-0">
            <House className="" />
          </NavLink>

          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      ) : (
        <div className="p-8" />
      )}
    </>
  );
}
