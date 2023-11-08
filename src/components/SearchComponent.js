import React, { useEffect, useState } from "react";
import { Watch } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import UserDetailsComponent from "./UserDetailsComponent";
const SearchComponent = () => {
  const { username } = useParams();
  useEffect(() => {
    if (username !== undefined || username !== "") {
      fetchUser();
    }
  }, []);
  const [userDetails, setUserDetails] = useState({
    name: "",
    bio: "",
    location: "",
    twitter: "",
    github: "",
    avatar_url: "",
    repo_count: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        setUserDetails({
          login: data.login,
          name: data.name,
          bio: data.bio || "No bio available",
          location: data.location || "No location available",
          twitter: data.twitter_username || "unavailable",
          github: data.html_url,
          avatar_url: data.avatar_url,
          repo_count: data.public_repos,
        });
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {!loading ? (
        <>
          {userDetails.login ? (
            <UserDetailsComponent userDetails={userDetails} />
          ) : (
            <div className="loader">
              <h2>Error: Nothing found for username - {username}</h2>
            </div>
          )}
        </>
      ) : (
        <div className="loader">
          <Watch height="120" width="120" color="#4a90cf" visible={true} />
          <h4>Please wait while the data is loading...</h4>
        </div>
      )}
    </>
  );
};

export default SearchComponent;