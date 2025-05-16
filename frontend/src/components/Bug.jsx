import axios from "axios";
import { EllipsisVertical } from "lucide-react";

import Card from "../components/Card";
import Dropdown from "../components/Dropdown";

export default function Bug({ bug }) {
  const bugToRenameUrl = `http://localhost:3000/bug/${bug.id}`;

  const token = localStorage.getItem("JWT");

  const bugActions = [
    {
      name: "Rename",
      function: async () => {
        await axios
          .patch(
            bugToRenameUrl,
            { name: "testy testy test" },
            { headers: { Authorization: `Bearer ${token}` } },
          )
          .then((response) => {
            if (response.status == 200) {
              console.log("Bug has been renamed successfully");
            }
          });
      },
    },
  ];

  return (
    <Card
      key={bug.id}
      classes="border-4 border-indigo-300 text-indigo-900 bg-indigo-300 hover:border-indigo-200"
    >
      <div className="flex justify-between">
        <h1 className="flex gap-1 text-lg">
          <strong className="rounded border-2 border-indigo-200 bg-indigo-200 px-1">
            [BUG]
          </strong>
          <span className="overflow-hidden font-semibold text-ellipsis">
            {bug.name}
          </span>
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
    </Card>
  );
}
