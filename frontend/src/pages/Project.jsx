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
        <>
          <h1 className="pb-3 font-bold text-xl">
            {"All bugs of " + project.name || "Bugs"}
          </h1>

          <ul className="grid  grid-cols-2 gap-5 ">
            {bugs.map((bug, index) => {
              return (
                <Card key={index}>
                  <h1 className="flex gap-1 text-lg">
                    <span className="overflow-hidden text-ellipsis font-semibold">
                      {bug.name}
                    </span>
                  </h1>
                  <span>
                    Created: {new Date(bug.createdAt).toLocaleDateString()}
                  </span>
                  <p></p>
                </Card>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
