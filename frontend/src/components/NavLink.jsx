import { Link } from "react-router-dom";
export default function NavLink(props) {
  const { text, link } = props;
  return (
    <Link to={link} className="p-1 border rounded">
      {text}
    </Link>
  );
}
