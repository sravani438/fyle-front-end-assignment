import React from "react";
import PaginationComponent from "./PaginationComponent";

const UserDetailsComponent = (props) => {
  const { userDetails } = props;
  return (
    <div className="user-details">
      <div className="user-details__main">
        <div>
          <img className="avatar" src={userDetails.avatar_url} />
        </div>
        <div className="details">
          <h1>{userDetails.name}</h1>
          <p>{userDetails.bio}</p>
          <p>
            <i className="fa-solid fa-location-dot"></i> {userDetails.location}
          </p>
          <p className="link-text">
            Twitter:{" "}
            <a
              href={`https://twitter.com/${userDetails.twitter}`}
              target="_blank"
            >
              {`https://twitter.com/${userDetails.twitter}`}
            </a>
          </p>
        </div>
      </div>
      <p className="link-text">
        <i className="fa-solid fa-link"></i>{" "}
        <a href={userDetails.github} target="_blank">
          {userDetails.github}
        </a>
      </p>
      <PaginationComponent
        username={userDetails.login}
        repo_count={userDetails.repo_count}
      />
    </div>
  );
};

export default UserDetailsComponent;
