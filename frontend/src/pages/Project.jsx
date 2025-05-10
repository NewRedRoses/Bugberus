import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import NavBar from "../components/Navbar";

export default function Project() {
  const [project, setProject] = useState({});
  const [bugs, setBugs] = useState([]);

  const params = useParams();
  const fetchBugsUrl = `http://localhost:3000/project/${params.projectId}/bugs`;
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
      .get(fetchBugsUrl, {
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
  }, [fetchBugsUrl]);

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
              <button
                className="px-2 text-slate-800 bg-slate-200 rounded border-r-slate-200 hover:cursor-pointer"
              >
                Add
              </button>
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
