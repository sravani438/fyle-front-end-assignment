import React, { useEffect, useState } from "react";
import { Watch } from "react-loader-spinner";
import CardComponent from "./CardComponent";

const ReposComponent = (props) => {
  const { page, username } = props;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  useEffect(() => {
    const loadPage = async (page_no) => {
      await fetch(
        `https://api.github.com/users/${username}/repos?per_page=6&page=${page_no}`,
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      )
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setRepos(data);
          setError({
            status: false,
            message: "",
          });
        })
        .catch((error) => {
          setError({
            status: true,
            message: error.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadPage(page);
  }, [page]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <Watch height="120" width="120" color="#4a90cf" visible={loading} />
          <h4>Please wait while the data is loading...</h4>
        </div>
      ) : (
        <>
          {error.status ? (
            <div className="loader">
              <h2>Error: {error.message}</h2>
            </div>
          ) : (
            <div className="repo-container">
              {repos &&
                repos.map((repo) => (
                  <CardComponent repo={repo} key={repo.id} />
                ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ReposComponent;