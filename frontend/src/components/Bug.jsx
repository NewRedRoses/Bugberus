import { useState } from "react";
import axios from "axios";
import {
  EllipsisVertical,
  TextCursorInput,
  Trash2,
  Bug as Buggy,
  BrushCleaning,
} from "lucide-react";
import { toast } from "react-toastify";

import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Selection from "./Selection";
import Button from "./Button";
import Modal from "../components/Modal";
import TextArea from "./Textarea";

export default function Bug({ bug, bugs, setBugs }) {
  const [newBug, setNewBug] = useState(bug);
  const [isBugBeingRenamed, setIsBugBeingRenamed] = useState(false);
  const [bugStatus, setBugStatus] = useState(bug.status);
  const [bugDifficulty, setBugDifficulty] = useState(bug.difficulty);
  const [isBugExpanded, setIsBugExpanded] = useState(false);

  const bugUrl = `http://localhost:3000/bug/${bug.id}`;

  const token = localStorage.getItem("JWT");

  const handleBugRename = async () => {
    if (bug.name == newBug.name) {
      setIsBugBeingRenamed(false);
    } else {
      await axios
        .patch(
          bugUrl + "/rename",
          { name: newBug.name },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
          if (response.status == 200) {
            toast.success("Bug has been renamed successfully.");
            setIsBugBeingRenamed(false);
          }
        })
        .catch((error) => {
          if (error.status == 422) {
            const errorMessages = error.response.data;
            toast.error(errorMessages[0].msg);
          } else {
            toast.error("Error renaming. Please try again later.");
          }
        });
    }
  };

  const handleBugDelete = async () => {
    await axios
      .delete(bugUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response.status == 200) {
          const backendBug = response.data;
          setBugs(bugs.filter((buggy) => buggy.id !== backendBug.id));
        }
      })
      .catch((error) =>
        toast.error("Error deleting bug. Please try again later."),
      );
  };

  const handleBugStatusChange = async (e) => {
    await axios.patch(
      bugUrl + "/status",
      { status: e.target.value },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  };
  const handleBugDifficultyChange = async (e) => {
    await axios.patch(
      bugUrl + "/difficulty",
      { difficulty: e.target.value },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  };

  const handleBugDescriptionSubmit = async () => {
    await axios
      .patch(
        bugUrl + "/description",
        { description: newBug.description },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {})
      .catch((error) => {
        toast.error("Error saving description. Try again later.");
      });
  };

  const handleModalVisibility = () => {
    console.log(newBug.description);
    handleBugDescriptionSubmit();
    setIsBugExpanded(!isBugExpanded);
  };

  const bugActions = [
    {
      name: "Rename",
      icon: TextCursorInput,
      classNames: "data-focus:bg-indigo-300",
      function: async () => {
        setIsBugBeingRenamed(!isBugBeingRenamed);
      },
    },
    {
      name: "Delete",
      icon: Trash2,
      classNames: "bg-red-300 text-red-900 data-focus:bg-red-400",
      function: handleBugDelete,
    },
  ];

  const bugStatusOptions = [
    {
      value: "UNDEFINED",
      label: "Not Started",
    },
    { value: "STARTED", label: "In Progress" },
    {
      value: "FINISHED",
      label: "Completed",
    },
  ];

  const bugDifficultyOptions = [
    {
      value: "UNDEFINED",
      label: "Unknown",
    },
    { value: "EASY", label: "Easy" },
    {
      value: "MEDIUM",
      label: "Medium",
    },
    {
      value: "HARD",
      label: "Hard",
    },
  ];

  return (
    <Card classes="flex flex-col place-content-between  h-full sm:h-65 text-indigo-900 bg-indigo-300 shadow">
      <div className="flex max-w-full justify-between">
        <div className="flex items-center gap-3 text-lg">
          <div className="max-h-fit rounded bg-indigo-400 p-1 px-1">
            <Buggy size={30} />
          </div>
          {isBugBeingRenamed ? (
            <div className="flex flex-col content-center justify-center gap-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBug.name}
                  className="w-1/2 border-b-2 font-semibold"
                  onChange={(e) =>
                    setNewBug({ ...newBug, name: e.target.value })
                  }
                />
                <div>
                  <Button
                    classNames="rounded bg-indigo-900 px-2 text-sm font-bold text-indigo-50  hover:cursor-pointer"
                    uiType="custom"
                    onClick={handleBugRename}
                  >
                    Done
                  </Button>
                </div>
              </div>
              <div className="text-sm font-normal">
                {new Date(bug.createdAt).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div className="">
              <div className="max-w-[15ch] overflow-hidden font-semibold text-nowrap text-ellipsis">
                {newBug.name}
              </div>
              <div className="text-sm font-normal">
                {new Date(bug.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
        <Dropdown
          menuBtn={<EllipsisVertical />}
          menuItems={bugActions}
          anchor="bottom"
          dropdownClasses="text-indigo-900 bg-indigo-200 border-2 border-indigo-300"
        />
      </div>
      {bug.description ? (
        <p className="mt-2 max-h-30 overflow-auto font-medium">
          {/* if old and new description do not  match -> show new description  */}
          {/* else -> show old description */}
          {bug.description != newBug.description
            ? newBug.description
            : bug.description}
        </p>
      ) : (
        <div className="align-center flex h-full items-center justify-center gap-2 text-lg font-medium text-indigo-900 opacity-50">
          <BrushCleaning />
          No Description
        </div>
      )}

      <Modal
        isModalOpen={isBugExpanded}
        setIsModalOpen={setIsBugExpanded}
        modalCardClasses={
          "!bg-indigo-200 !text-indigo-950 w-lg  rounded-xl border-2 border-indigo-300"
        }
      >
        <h1 className="text-xl font-bold">{newBug.name}</h1>

        <div className="mb-8 flex flex-col gap-3">
          <div className="pt-4 pb-2">
            <label className="flex gap-3 font-semibold">
              Progress:
              <Selection
                value={bugStatus}
                onChange={(e) => {
                  handleBugStatusChange(e);
                  setBugStatus(e.target.value);
                }}
                options={bugStatusOptions}
                name="status"
                ariaLabel="Bug accomplishment status"
                selectionClasses="bg-indigo-300 rounded pl-1 text-indigo-900  font-medium hover:cursor-pointer"
              />
            </label>
          </div>
          <div>
            <label className="flex gap-3 font-semibold">
              Difficulty:
              <Selection
                value={bugDifficulty}
                onChange={(e) => {
                  handleBugDifficultyChange(e);
                  setBugDifficulty(e.target.value);
                }}
                options={bugDifficultyOptions}
                name="difficulty"
                ariaLabel="Bug difficulty level"
                selectionClasses="bg-indigo-300 rounded pl-1 text-indigo-900  font-medium hover:cursor-pointer"
              />
            </label>
          </div>
        </div>

        <TextArea
          textareaClasses="mt-2 w-full bg-indigo-100 border border-indigo-300 rounded-lg p-2"
          defaultValue={newBug.description}
          value={newBug.description}
          labelClasses="font-medium"
          label="Description"
          onChange={(e) =>
            setNewBug({ ...newBug, description: e.target.value })
          }
        ></TextArea>

        <Button onClick={() => setIsBugExpanded(false)}>Cancel</Button>
        <Button onClick={handleModalVisibility}>Save</Button>
      </Modal>
      <Button onClick={() => setIsBugExpanded(true)}>Open</Button>
    </Card>
  );
}
