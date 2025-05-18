import { Link } from "react-router-dom";
export default function NavLink({
  to,
  children,
  classNames = "h-fit px-2 font-bold text-slate-700 hover:cursor-pointer",
}) {
  return (
    <Link to={to} className={classNames}>
      {children}
    </Link>
  );
}
