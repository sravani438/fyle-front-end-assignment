import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../App.css";

const HomeComponent = () => {
  const naigate = useNavigate();
  const [inputName, setInputName] = useState("");
  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      return naigate(`/${inputName}`);
    }
  };
  return (
    <div className="container">
      <div className="search-container">
        <h4>Enter a GitHub username</h4>
        <input
          type="text"
          placeholder="Enter a username"
          onChange={(e) => handleNameChange(e)}
          onKeyDown={(e) => handleEnterPress(e)}
        />
        <Link to={`/${inputName}`}>
          <button className="search__btn">Search</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeComponent;
