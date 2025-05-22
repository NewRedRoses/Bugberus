import { useState } from "react";
import axios from "axios";
import { EllipsisVertical, TextCursorInput, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Selection from "./Selection";

export default function Bug({ bug }) {
  const [newBug, setNewBug] = useState(bug);
  const [isBugBeingRenamed, setIsBugBeingRenamed] = useState(false);
  const [bugStatus, setBugStatus] = useState(bug.status);

  const bugUrl = `http://localhost:3000/bug/${bug.id}`;

  const token = localStorage.getItem("JWT");

  const handleBugRename = async () => {
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
      .catch((error) => toast.error("Error renaming bug. Please try again."));
  };

  const handleBugDelete = async () => {
    await axios
      .delete(bugUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response.status == 200) {
          toast.success("Bug has been deleted succesfully.");
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
    <Card classes="flex flex-col h-full border-4 border-indigo-300 text-indigo-900 bg-indigo-300 shadow">
      <div className="flex max-w-full justify-between">
        <div className="flex items-center gap-2 text-lg">
          <strong className="max-h-fit rounded bg-indigo-200 p-1 px-2">
            [BUG]
          </strong>
          {isBugBeingRenamed ? (
            <>
              <input
                type="text"
                value={newBug.name}
                className="w-1/2 rounded border px-1 font-semibold"
                onChange={(e) => setNewBug({ ...newBug, name: e.target.value })}
              />
              <button
                className="rounded border-1 bg-indigo-300 px-1 text-sm"
                onClick={handleBugRename}
              >
                Done
              </button>
            </>
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
      {bug.description && <p className="pt-3 font-medium">{bug.description}</p>}

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
