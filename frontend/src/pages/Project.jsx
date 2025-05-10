import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import Card from "../components/Card";
import NavBar from "../components/Navbar";
import Modal from "../components/Modal";

export default function Project() {
  const [project, setProject] = useState({});
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({ name: "", description: "" });

  const params = useParams();
  const bugsUrl = `http://localhost:3000/project/${params.projectId}/bugs`;
  const fetchProjectUrl = `http://localhost:3000/project/${params.projectId}`;
  const token = localStorage.getItem("JWT");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(fetchProjectUrl, {
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

  return (
    <div className="container">
      <NavBar />

      {project == 404 ? (
        <>
          <h1 className="pb-3 font-bold text-xl">Error 404:</h1>
          <p>The project you are looking for does not exist!</p>
        </>
      ) : (
        <div className="pt-5">
          <span>
            <h1 className="pb-5 font-bold text-xl flex gap-5">
              {"All bugs of " + project.name || "Bugs"}
              <Modal
                openBtnTitle="Add a Bug"
                openBtnClasses="px-2 text-slate-800 bg-slate-200 rounded border-r-slate-200 hover:cursor-pointer"
                modalTitle={`Add a new bug to "${project.name}"`}
                modalTitleClasses="text-xl"
              >
                {({ closeModal }) => (
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
                          className="p-2 rounded bg-slate-200"
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
                          className="p-2 rounded bg-slate-200"
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
                        className="px-3 rounded bg-green-200 text-green-900 font-bold hover:cursor-pointer"
                        onClick={() => {
                          sendBugRequest();
                          closeModal();
                        }}
                      >
                        Add Bug
                      </button>
                    </div>
                  </>
                )}
              </Modal>
            </h1>
          </span>

          <ul className="grid  grid-cols-2 gap-5 ">
            {bugs.map((bug, index) => {
              return (
                <Card
                  key={index}
                  classes="border-4 border-indigo-300 text-indigo-900 bg-indigo-300 hover:border-indigo-200"
                >
                  <h1 className="flex gap-1 text-lg">
                    <strong className="px-1 bg-indigo-200 border-2 border-indigo-200 rounded">
                      [BUG]
                    </strong>
                    <i className="overflow-hidden text-ellipsis font-semibold">
                      “{bug.name}"
                    </i>
                  </h1>
                  <span>
                    Created: {new Date(bug.createdAt).toLocaleDateString()}
                  </span>
                  <p></p>
                </Card>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
