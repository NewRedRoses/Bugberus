import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";

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
        <ul className="flex gap-2 flex-wrap">
          {projects.map((project, index) => {
            return (
              <li key={index} className="w-2xs p-2 border rounded-lg">
                <div className="font-bold">{project.name}</div>
                {project._count.bugs >= 1
                  ? `${project._count.bugs} bug(s)`
                  : project._count.bugs}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
