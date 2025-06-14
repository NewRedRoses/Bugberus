import { useNavigate, useLocation } from "react-router";
import { House, LogOut, User } from "lucide-react";

import NavLink from "./NavLink.jsx";
import Button from "./Button.jsx";
import Dropdown from "./Dropdown.jsx";

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

  const routesWithoutNavbar = ["/login", "/signup", "/passwordReset"];

  const loginActions = [
    {
      name: "Log Out",
      classNames: "text-sm  data-focus:bg-slate-300",
      icon: LogOut,
      function: handleLogout,
    },
  ];

  const RightDiv = () => {
    return (
      <div className="flex flex-col items-center gap-1 border-slate-300 p-1 hover:border-slate-400">
        <User />
      </div>
    );
  };
  return (
    <>
      {shouldNavbarBeHidden(currentPath, routesWithoutNavbar) == false ? (
        <div className="container flex justify-between px-10 text-slate-700">
          <NavLink to="/" classNames="p-0">
            <House className="" />
          </NavLink>

          <Dropdown
            menuBtn={<RightDiv />}
            menuItems={loginActions}
            anchor="bottom"
          />
        </div>
      ) : (
        <div className="p-8" />
      )}
    </>
  );
}
