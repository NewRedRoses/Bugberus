import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("JWT");
    navigate("/login");
  };

  return (
    <div className="flex justify-end">
      <button
        className="rounded-xl px-2 bg-slate-200 text-slate-800 font-bold hover:cursor-pointer"
        onClick={handleClick}
      >
        Log Out
      </button>
    </div>
  );
}
