import { useState } from "react";
import NavLink from "../components/NavLink";
import axios from "axios";
export default function Signup() {
  const backendUrl = "http://localhost:3000/auth/signup";
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = await axios.post(backendUrl, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  return (
    <div className="container flex flex-col gap-5">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Create an account</h1>

        <div id="form" className="p-3 border flex flex-col gap-2">
          <div id="username" className="w-md lflex flex-col">
            <label htmlFor="username" className="pr-4">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div id="password" className="flex flex-col">
            <label htmlFor="password" className="pr-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div id="email" className="flex flex-col">
            <label htmlFor="email" className="pr-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <button className="px-1 border rounded h-fit " onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </div>
      <div className="">
        <span className="pr-2">Already have an account?</span>
        <NavLink text="Log in" link="/login" />
      </div>
    </div>
  );
}
