import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Input from "../components/Input";
import Button from "../components/Button";
import NavLink from "../components/NavLink.jsx";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  let [searchParams] = useSearchParams();
  const passwordResetURL = "http://localhost:3000/auth/reset-password";
  const passwordResetCheckURL =
    "http://localhost:3000/auth/reset-password-check";
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios
      .post(
        passwordResetCheckURL,
        {
          token: searchParams.get("token"),
          userId: searchParams.get("id"),
          password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then((response) => {
        toast.success("Password reset correctly");
        navigate("/login");
      })
      .catch((error) => {
        if (error.status == 401) {
          toast.error("Invalid or expired token");
        }
      });
  };

  const passwordResetRequest = async () => {
    await axios
      .post(
        passwordResetURL,
        {
          email: resetPasswordEmail,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then((response) => {
        toast.success(
          "Thank you for your request. If the submitted email exists, you will receive an email shortly, detailing further proceedings.",
        );
      })
      .catch((error) => {
        if (error.status == 401) {
          toast.error("Invalid or expired token");
        }
      });
  };

  return (
    <div className="flex flex-col gap-5">
      {searchParams.get("token") ? (
        <>
          <h1 className="text-2xl font-bold">Forgotten password Request</h1>
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <div>
            <div className="flex w-fit gap-5">
              <NavLink to="/login">Login Page</NavLink>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Forgotten password Request</h1>
          <Input
            label="Email of the account:"
            type="email"
            value={resetPasswordEmail}
            onChange={(e) => setResetPasswordEmail(e.target.value)}
          />
          <div>
            <div className="flex w-fit gap-5">
              <NavLink to="/login">Login Page</NavLink>
              <Button onClick={passwordResetRequest}>Submit</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
