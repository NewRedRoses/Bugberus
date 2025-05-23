import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FileWarning } from "lucide-react";

import "./App.css";
import { handlEnglisheWordingForMultiples } from "./helpers.js";
import Button from "./components/Button.jsx";
import Modal from "./components/Modal.jsx";
import Input from "./components/Input.jsx";
import NoContent from "./components/NoContent.jsx";

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const projectsUrl = "http://localhost:3000/user/projects";
  const createProjectUrl = "http://localhost:3000/project";
  const token = localStorage.getItem("JWT");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(projectsUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setIsUserLoggedIn(true);
          if (response.data.length > 0) {
            setProjects(response.data);
          } else {
            setProjects(null);
          }
        }
      })
      .catch((error) => {
        if (error.status == 403) {
          localStorage.removeItem("JWT");
          navigate("/login");
        }
      });
  }, [projectsUrl]);

  const handleAddProject = async () => {
    await axios
      .post(createProjectUrl, newProject, {
        "Content-Type": "application/x-www-form-urlencoded",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success("Post created successfully.");
          setNewProject({ name: "" });
          setIsModalOpen(false);
        }
      })
      .catch((error) => toast.error("Error creating project."));
  };

  return (
    <>
      {isUserLoggedIn && (
        <div className="container mt-10 flex flex-col px-10">
          <span className="flex items-center gap-4 pb-5">
            <h1 className="text-3xl font-bold">Projects</h1>

            <Modal
              openBtnTitle="Add"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              modalTitle="Create a new project"
            >
              <div className="flex flex-col">
                <Input
                  label="Project name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                />
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <Button uiType="cancel">Cancel</Button>
                <Button onClick={handleAddProject}>Create</Button>
              </div>
            </Modal>
          </span>
          {projects == null ? (
            <NoContent Icon={FileWarning} message="No Projects" />
          ) : (
            <ul className="flex flex-wrap gap-2">
              {projects.map((project, index) => {
                return (
                  <Link key={index} to={`/project/${project.id}`}>
                    <li className="w-2xs rounded-2xl bg-yellow-100 p-3 pl-5 text-yellow-900 shadow-md">
                      <div className="pb-1 font-bold">{project.name}</div>
                      {/* {handlEnglisheWordingForMultiples("bug", project._count.bugs)} */}
                    </li>
                  </Link>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default App;
