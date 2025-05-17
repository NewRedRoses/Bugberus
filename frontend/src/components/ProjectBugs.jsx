import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Bug from "../components/Bug.jsx";
import Modal from "../components/Modal";

export default function ProjectBugs({ project, bugs, bugsUrl, params }) {
  const [isBugBeingRenamed, setIsBugBeingRenamed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBug, setNewBug] = useState({ name: "", description: "" });

  const token = localStorage.getItem("JWT");

  const sendBugRequest = async () => {
    await axios
      .post(bugsUrl, newBug, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success("Bug has been added to project successfully.");
        }
      })
      .catch((error) => toast.error("Failure creating bug. Please try again."));
  };

  return (
    <>
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
              <div id="bug-name-container" className="flex flex-col gap-2">
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
      <ul className="grid grid-cols-2 gap-5">
        {bugs.map((bug) => {
          return <Bug key={bug.id} bug={bug} />;
        })}
      </ul>
    </>
  );
}
