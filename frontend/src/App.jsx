import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
import { handlEnglisheWordingForMultiples } from "./helpers.js";

function App() {
  const [projects, setProjects] = useState([]);

  const projectsUrl = "http://localhost:3000/user/projects";
  const token = localStorage.getItem("JWT");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(projectsUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setProjects(response.data);
        }
      })
      .catch((error) => {
        if (error.status == 403) {
          localStorage.removeItem("JWT");
          navigate("/login");
        }
      });
  }, [projectsUrl]);

  return (
    <>
      <NavBar />

      <div className="container flex flex-col justify-center items-center">
        <h1 className="pb-3 text-xl font-bold ">Projects</h1>
        <ul className="flex gap-2 flex-wrap gap-2">
          {projects.map((project, index) => {
            return (
              <Link key={index} to={`/project/${project.id}`}>
                <li className="w-2xs  p-2 shadow-md  rounded-2xl bg-yellow-100 text-yellow-900">
                  <div className="font-bold pb-1">{project.name}</div>
                  {handlEnglisheWordingForMultiples("bug", project._count.bugs)}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
