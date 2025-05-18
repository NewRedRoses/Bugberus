import { Link } from "react-router";
export default function NavLink({
  to,
  children,
  // classNames = "text-slate-700  flex justify-center align-center font-bold px-3  rounded underline-offset-4 hover:underline  hover:bg-slate-700 hover:text-slate-50 hover:no-underline",
  classNames = "text-slate-700  flex justify-center align-center font-bold px-3 rounded underline-offset-2 hover:underline",
}) {
  return (
    <Link to={to} className={classNames}>
      {children}
    </Link>
  );
}
