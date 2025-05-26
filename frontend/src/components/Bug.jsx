import { useState } from "react";
import axios from "axios";
import {
  EllipsisVertical,
  TextCursorInput,
  Trash2,
  Bug as Buggy,
} from "lucide-react";
import { toast } from "react-toastify";

import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Selection from "./Selection";
import Button from "./Button";

export default function Bug({ bug, bugs, setBugs }) {
  const [newBug, setNewBug] = useState(bug);
  const [isBugBeingRenamed, setIsBugBeingRenamed] = useState(false);
  const [bugStatus, setBugStatus] = useState(bug.status);

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
          toast.success("Bug has been deleted successfully.");
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

  return (
    <Card classes="flex flex-col h-full sm:h-65 border-4 border-indigo-300 text-indigo-900 bg-indigo-300 shadow">
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
      {bug.description && (
        <p className="mt-2 max-h-30 overflow-auto font-medium">
          {bug.description}
        </p>
      )}

      <div className="mt-auto flex items-end justify-end pt-4 pb-2">
        <Selection
          value={bugStatus}
          onChange={(e) => {
            handleBugStatusChange(e);
            setBugStatus(e.target.value);
          }}
          options={bugStatusOptions}
          name="status"
          ariaLabel="Bug accomplishment status"
          selectionClasses="px-2  bg-indigo-400 text-indigo-900  font-semibold rounded-3xl hover:cursor-pointer"
        />
      </div>
    </Card>
  );
}
