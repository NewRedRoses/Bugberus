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
import NavLink from "./components/NavLink.jsx";

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areProjectsLoading, setAreProjectsLoading] = useState(true);

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
          if (response.data.length > 0) {
            setProjects(response.data);
          } else {
            setProjects(null);
          }
        }
        setAreProjectsLoading(false);
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
          setProjects([...projects, response.data]);
          // reset the value in case a new project will be created after
          setNewProject({ name: "" });
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        if (error.status == 422) {
          const errorMessages = error.response.data;
          toast.error(errorMessages[0].msg);
        }
      });
  };

  return (
    <>
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

        {areProjectsLoading ? (
          <div className="align-center mt-30 flex h-max justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {projects == null ? (
              <NoContent Icon={FileWarning} message="No Projects" />
            ) : (
              <ul className="mt-4 grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
                {projects.map((project) => {
                  return (
                    <NavLink
                      key={project.id}
                      classNames="w-full"
                      to={`/project/${project.id}`}
                    >
                      <li className="flex h-20 items-center justify-between rounded-2xl bg-yellow-100 p-3 pl-5 text-yellow-700 ring-2 ring-yellow-300">
                        <div className="text-xl font-bold">{project.name}</div>
                        <div className="pr-4">
                          {handlEnglisheWordingForMultiples(
                            "bug",
                            project.bugs.length,
                          )}
                        </div>
                      </li>
                    </NavLink>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
