import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";

import Card from "../components/Card";
import NavBar from "../components/Navbar";
import Modal from "../components/Modal";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";

export default function Project() {
  const [project, setProject] = useState({});
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({ name: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectBeingRenamed, setIsProjectBeingRenamed] = useState(false);

  const params = useParams();
  const bugsUrl = `http://localhost:3000/project/${params.projectId}/bugs`;
  const projectUrl = `http://localhost:3000/project/${params.projectId}`;
  const token = localStorage.getItem("JWT");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(projectUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setProject(response.data);
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          setProject(404);
        }
      });

    axios
      .get(bugsUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setBugs(response.data);
        }
      })
      .catch((error) => {
        if (error.status == 403) {
          localStorage.removeItem("JWT");
          navigate("/login");
        }
      });
  }, [bugsUrl]);

  const sendBugRequest = async () => {
    await axios
      .post(bugsUrl, newBug, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => console.log(response.status));
  };

  const handleProjectDelete = () => {
    const isProjectDeleteConfirmed = confirm(
      "Are you sure you would like to delete this project?",
    );
    if (isProjectDeleteConfirmed) {
      axios
        .delete(projectUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status == 200) {
            // TODO: notify that project has been successfully deleted
            console.log("project deleted");
            navigate("/home");
          }
        });
    }
  };

  const handleProjectRename = () => {
    setIsProjectBeingRenamed(true);
  };

  const updateProject = async () => {
    await axios
      .patch(
        projectUrl,
        { name: project.name },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        if (response.status == 200) {
          setIsProjectBeingRenamed(false);
        }
      });
  };

  const projectActions = [
    { name: "Rename", function: handleProjectRename },
    {
      name: "Delete",
      classNames: "px-2 hover:cursor-pointer rounded bg-red-200 text-red-900",
      function: handleProjectDelete,
    },
  ];
  return (
    <div className="container">
      <NavBar />

      {project == 404 ? (
        <>
          <h1 className="pb-3 text-xl font-bold">Error 404:</h1>
          <p>The project you are looking for does not exist!</p>
        </>
      ) : (
        <div className="pt-5">
          <h1 className="flex gap-5 pb-5 text-2xl font-bold">
            {isProjectBeingRenamed ? (
              <>
                <input
                  value={project.name}
                  className="w-fit rounded border border-slate-400 p-1"
                  onChange={(e) => {
                    setProject({ ...project, name: e.target.value });
                  }}
                />
                <Button onClick={updateProject}>Save</Button>
              </>
            ) : (
              <span>{project.name}</span>
            )}
            <Dropdown
              menuBtn={<EllipsisVertical />}
              menuBtnClasses="hover:cursor-pointer"
              menuItems={projectActions}
              anchor="right"
            />
          </h1>
          <span>
            <h2 className="flex gap-5 pb-5 text-xl font-medium">
              All project bugs
              <Modal
                openBtnTitle="Add Bug"
                modalTitle={`Add a new bug to "${project.name}"`}
                modalTitleClasses="text-xl"
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              >
                <>
                  <div className="flex flex-col gap-5 pt-3 pb-5">
                    <div
                      id="bug-name-container"
                      className="flex flex-col gap-2"
                    >
                      <label htmlFor="bugName" className="font-medium">
                        Name:
                      </label>
                      <input
                        type="text"
                        id="bugName"
                        className="rounded bg-slate-200 p-2"
                        value={newBug.name}
                        onChange={(e) => {
                          setNewBug({ ...newBug, name: e.target.value });
                        }}
                      />
                    </div>

                    <div
                      id="bug-description-container"
                      className="flex flex-col gap-2"
                    >
                      <label htmlFor="bugDescription" className="font-medium">
                        Description:
                      </label>
                      <textarea
                        id="bugDescription"
                        className="rounded bg-slate-200 p-2"
                        value={newBug.description}
                        onChange={(e) => {
                          setNewBug({
                            ...newBug,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="rounded bg-green-200 px-3 font-bold text-green-900 hover:cursor-pointer"
                      onClick={() => {
                        sendBugRequest();
                        setIsModalOpen(false);
                      }}
                    >
                      Add Bug
                    </button>
                  </div>
                </>
              </Modal>
            </h2>
          </span>

          <ul className="grid grid-cols-2 gap-5">
            {bugs.map((bug, index) => {
              return (
                <Card
                  key={index}
                  classes="border-4 border-indigo-300 text-indigo-900 bg-indigo-300 hover:border-indigo-200"
                >
                  <h1 className="flex gap-1 text-lg">
                    <strong className="rounded border-2 border-indigo-200 bg-indigo-200 px-1">
                      [BUG]
                    </strong>
                    <i className="overflow-hidden font-semibold text-ellipsis">
                      “{bug.name}"
                    </i>
                  </h1>
                  <span>
                    Created: {new Date(bug.createdAt).toLocaleDateString()}
                  </span>
                  <p className="pt-3">{bug.description || ""}</p>
                </Card>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
