import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

import NavLink from "../components/NavLink";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const backendUrl = "http://localhost:3000/auth/signup";
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios
      .post(backendUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success("Account created successfully");
          navigate("/login");
        }
      })
      .catch((error) => {
        const { message } = error.response.data;
        toast.error(
          message || "Error creating account. Please ensure form is complete.",
        );
      });
  };
  return (
    <div className="container mt-10 flex flex-col items-center gap-5 px-10">
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl font-bold">Create an account</h1>

        <div
          id="form"
          className="mb-2 flex flex-col items-center gap-4 border p-3"
        >
          <Input
            label="Username"
            id="username"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />
          <div id="password" className="flex flex-col">
            <Input
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </div>
          <div id="email" className="flex flex-col">
            <Input
              label="Email"
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>
          <Button
            onClick={handleSubmit}
            uiType="custom"
            classNames="p-1 mt-3 rounded bg-slate-700 text-slate-100 font-bold border px-4 hover:cursor-pointer "
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className="">
        <span className="pr-2">Already have an account?</span>
        <NavLink to="/login">Log In</NavLink>
      </div>
    </div>
  );
}
