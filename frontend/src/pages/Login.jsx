import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavLink from "../components/NavLink";
import Input from "../components/Input";
import Button from "../components/Button.jsx";
export default function Login() {
  const backendUrl = "http://localhost:3000/auth/login";
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(backendUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("JWT", response.data.token);
          navigate("/home");
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };
  return (
    <div className="container flex flex-col gap-5">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Login</h1>

        {error != false && (
          <div
            id="error"
            className="w-1/2 flex justify-center items-center border p-2 rounded bg-red-200 border-red-700 font-bold text-red-900"
          >
            Incorrect username or password
          </div>
        )}

        <div id="form">
          <Input
            type="text"
            id="username"
            value={formData.username}
            label="Username:"
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />

          <Input
            type="password"
            id="password"
            value={formData.password}
            label="Password:"
            className="w-1/3 rounded border"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <Button
          classNames="w-1/3 p-1 rounded bg-slate-600 text-slate-100 font-bold border px-1 hover:cursor-pointer "
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </div>
      <div className="">
        <span className="pr-2">Don't have an account?</span>
        <NavLink text="Create an account!" link="/signup" />
      </div>
    </div>
  );
}
