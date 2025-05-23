import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import {
  EllipsisVertical,
  Trash2,
  TextCursorInput,
  CircleAlert,
} from "lucide-react";
import { toast } from "react-toastify";

import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import ProjectBugs from "../components/ProjectBugs";
import Input from "../components/Input";
import NoContent from "../components/NoContent";

export default function Project() {
  const [project, setProject] = useState({});
  const [bugs, setBugs] = useState([]);
  const [isProjectBeingRenamed, setIsProjectBeingRenamed] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

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
          setIsUserLoggedIn(true);
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          setProject(404);
          setIsUserLoggedIn(true);
        }
      });

    axios
      .get(bugsUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          if (response.data.length > 0) {
            setBugs(response.data);
          } else {
            setBugs(null);
          }
        }
      })
      .catch((error) => {
        if (error.status == 403) {
          localStorage.removeItem("JWT");
          navigate("/login");
        }
      });
  }, [bugsUrl]);

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
            toast.success("Project deleted successfully.");
            navigate("/");
          }
        })
        .catch((error) => {
          toast.error("Error deleting project. Please try again later.");
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
          toast.success("Project renamed successfully");
        }
      });
  };

  const projectActions = [
    {
      name: "Rename",
      classNames: "data-focus:bg-slate-300",
      icon: TextCursorInput,
      function: handleProjectRename,
    },
    {
      name: "Delete",
      icon: Trash2,
      classNames: "bg-red-200 text-red-900",
      function: handleProjectDelete,
    },
  ];
  return (
    <>
      {isUserLoggedIn && (
        <div className="container">
          {project == 404 ? (
            <div className="px-10 pt-10">
              <NoContent
                Icon={CircleAlert}
                title="404: Error"
                message="The Project you are looking for does not exist!"
              />
            </div>
          ) : (
            <div className="container mt-10 px-10">
              <div className="flex w-fit flex-wrap gap-2 pb-5 font-bold">
                {isProjectBeingRenamed ? (
                  <div className="flex flex-wrap items-center gap-4">
                    <Input
                      value={project.name}
                      className="w-2xs rounded border-1 border-slate-300 bg-slate-50 px-2 text-3xl"
                      onChange={(e) =>
                        setProject({ ...project, name: e.target.value })
                      }
                    />

                    <div className="flex items-center gap-2 text-lg">
                      <Button
                        onClick={updateProject}
                        uiType="custom"
                        classNames=" text-emerald-50 bg-emerald-700 px-3 rounded-xl border-4 hover:border-emerald-800  border-transparent hover:cursor-pointer"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsProjectBeingRenamed(false)}
                        uiType="custom"
                        classNames="text-slate-500  bg-slate-300 hover:border-slate-400  border-transparent px-3 rounded-xl border-4 hover:cursor-pointer"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <h1 className="text-3xl">{project.name}</h1>
                    <div className="flex pt-1">
                      <Dropdown
                        menuBtn={<EllipsisVertical />}
                        menuItems={projectActions}
                        anchor="right"
                      />
                    </div>
                  </div>
                )}
              </div>
              <ProjectBugs
                project={project}
                bugs={bugs}
                bugsUrl={bugsUrl}
                params={params}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
