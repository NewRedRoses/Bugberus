import Input from "../components/Input";
import NavLink from "../components/NavLink";

export default function Login() {
  const backendUrl = "http://localhost:3000";

  return (
    <div className="container flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <form action={backendUrl + "/auth"} method="post" className="flex-col">
          <Input label="Username" name="username" type="text" />
          <Input label="Password" name="password" type="password" />
          <button className="px-1 border rounded h-fit ">Log In</button>
        </form>
      </div>
      <div className="">
        <span className="pr-2">Don't have an account?</span>
        <NavLink text="Create an account!" link="signup" />
      </div>
    </div>
  );
}
