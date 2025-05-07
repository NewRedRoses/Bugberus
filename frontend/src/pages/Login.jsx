import { useState } from "react";
import NavLink from "../components/NavLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <button className="px-1 border rounded h-fit " onClick={handleSubmit}>
          Log In
        </button>
      </div>
      <div className="">
        <span className="pr-2">Don't have an account?</span>
        <NavLink text="Create an account!" link="/signup" />
      </div>
    </div>
  );
}
