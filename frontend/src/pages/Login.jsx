import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

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
        toast.error("Incorrect username or password.");
      });
  };
  return (
    <div className="container mt-10 flex flex-col items-center gap-5 px-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Login</h1>

        <div id="form" className="mt-5 flex flex-col gap-4 pb-5">
          <Input
            type="text"
            id="username"
            value={formData.username}
            label="Username"
            inputClassNames="px-2 border rounded"
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />

          <Input
            type="password"
            id="password"
            value={formData.password}
            label="Password"
            inputClassNames="px-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <Button
          classNames=" p-1 rounded bg-slate-700 text-slate-100 font-bold border px-1 hover:cursor-pointer "
          uiType="custom"
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </div>
      <div className="pt-3">
        <span className="pr-2">Don't have an account?</span>
        <NavLink to="/signup">Create an account!</NavLink>
      </div>
    </div>
  );
}
