import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SquarePlus, Bug as BugLucide } from "lucide-react";

import Bug from "../components/Bug.jsx";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import NoContent from "../components/NoContent";

export default function ProjectBugs({
  project,
  bugs,
  setBugs,
  bugsUrl,
  isLoading,
}) {
  const [isBugBeingRenamed, setIsBugBeingRenamed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBug, setNewBug] = useState({ name: "", description: "" });
  const [bugsToRender, setBugsToRender] = useState(bugs);
  const [filtering, setFiltering] = useState({
    isEnabled: false,
    filteringBy: "",
  });

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
          const backendBug = response.data;
          setBugs([...bugs, backendBug]);
        }
        setIsModalOpen(false);
      })
      .catch((error) => {
        if (error.status == 422) {
          const errorMessages = error.response.data;

          toast.error(errorMessages[0].msg);
        }
        setIsModalOpen(false);
      });
  };

  const filteringOptions = [
    { value: "UNDEFINED", label: "Unstarted" },
    { value: "STARTED", label: "In Progress" },
    { value: "FINISHED", label: "Completed" },
  ];

  const filterBugsByStatus = (status) => {
    return bugs.filter((bug) => bug.status == status);
  };

  return (
    <>
      <div className="mb-5 flex h-full gap-2 text-xl font-medium">
        <span>All Bugs</span>
        <Modal
          openBtnTitle={<SquarePlus />}
          openBtnClasses="hover:cursor-pointer"
          openBtnUiType="custom"
          modalTitle={`Add a new bug to "${project.name}"`}
          modalTitleClasses="text-xl"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        >
          <>
            <div className="flex flex-col gap-5 pt-3 pb-5">
              <div id="bug-name-container" className="flex flex-col gap-2">
                <Input
                  className="rounded bg-slate-200 p-2"
                  value={newBug.name}
                  label="Bug Name"
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

            <div className="flex justify-end gap-2">
              <Button
                uiType={"cancel"}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                uiType="custom"
                classNames="rounded bg-indigo-300 p-1 px-3 font-bold text-indigo-800  hover:bg-indigo-900 hover:text-indigo-50"
                onClick={sendBugRequest}
              >
                Add Bug
              </Button>
            </div>
          </>
        </Modal>
      </div>
      {isLoading ? (
        <div className="align-center mt-30 flex h-max justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {bugs == null ? (
            <NoContent Icon={BugLucide} message="No bugs tracked" />
          ) : (
            <>
              <div className="flex gap-3 pb-5">
                {filteringOptions.map((option) => {
                  return (
                    <Button
                      key={option.value}
                      onClick={() => {
                        setFiltering({
                          ...filtering,
                          isEnabled: true,
                          filteringBy: option.value,
                        });
                        setBugsToRender(filterBugsByStatus(option.value));
                      }}
                    >
                      {option.label}
                    </Button>
                  );
                })}
                <Button
                  onClick={() => {
                    setFiltering({ ...filtering, isEnabled: false });
                  }}
                >
                  Reset
                </Button>
              </div>

              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {filtering.isEnabled ? (
                  <>
                    {bugsToRender.map((bug) => {
                      return (
                        <li key={bug.id}>
                          <Bug bug={bug} bugs={bugs} setBugs={setBugs} />
                        </li>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {bugs.map((bug) => {
                      return (
                        <li key={bug.id}>
                          <Bug bug={bug} bugs={bugs} setBugs={setBugs} />
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}
