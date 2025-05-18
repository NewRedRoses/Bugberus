import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { EllipsisVertical, Trash2, TextCursorInput } from "lucide-react";
import { toast } from "react-toastify";

import NavBar from "../components/Navbar";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import ProjectBugs from "../components/ProjectBugs";

export default function Project() {
  const [project, setProject] = useState({});
  const [bugs, setBugs] = useState([]);
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
            navigate("/home");
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
          <ProjectBugs
            project={project}
            bugs={bugs}
            bugsUrl={bugsUrl}
            params={params}
          />
        </div>
      )}
    </div>
  );
}
