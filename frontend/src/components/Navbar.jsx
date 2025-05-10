import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("JWT");
    navigate("/login");
  };

  return (
    <div className="flex justify-between text-slate-700">
      <Link
        to="/home"
        className="rounded-md px-2 bg-slate-200 font-bold hover:cursor-pointer"
      >
        Home
      </Link>

      <button
        className="rounded-md px-2 bg-slate-200 font-bold hover:cursor-pointer"
        onClick={handleClick}
      >
        Log Out
      </button>
    </div>
  );
}
