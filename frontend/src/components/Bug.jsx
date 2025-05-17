import { useState } from "react";
import axios from "axios";
import { EllipsisVertical } from "lucide-react";

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
          // TODO: implement notify
          console.log("Bug has been renamed successfully");
          setIsBugBeingRenamed(false);
        }
      });
  };

  const handleBugDelete = async () => {
    await axios
      .delete(bugUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response.status == 200) {
          // TODO: implement notify
          console.log("Bug has been deleted successfully");
        }
      });
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
      function: async () => {
        setIsBugBeingRenamed(!isBugBeingRenamed);
      },
    },
    {
      name: "Delete",
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
    <Card
      key={bug.id}
      classes="border-4 border-indigo-300 text-indigo-900 bg-indigo-300 hover:border-indigo-200 shadow"
    >
      <div className="flex justify-between">
        <h1 className="flex gap-1 text-lg">
          <strong className="rounded border-2 border-indigo-200 bg-indigo-200 px-1">
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
            <span className="overflow-hidden font-semibold text-ellipsis">
              {newBug.name}
            </span>
          )}
        </h1>
        <Dropdown
          menuBtn={<EllipsisVertical />}
          menuBtnClasses="hover:cursor-pointer"
          menuItems={bugActions}
          anchor="bottom"
        />
      </div>
      <span>Created: {new Date(bug.createdAt).toLocaleDateString()}</span>
      <p className="pt-3">{bug.description || ""}</p>

      <div className="flex justify-end pt-4 pb-2">
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
