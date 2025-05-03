import NavLink from "../components/NavLink";
export default function Index() {
  return (
    <div className="container">
      <p>you're supposed to be logged in soo....</p>
      <NavLink text="Login" link="login" />
      <NavLink text="Home" link="home" />
    </div>
  );
}
