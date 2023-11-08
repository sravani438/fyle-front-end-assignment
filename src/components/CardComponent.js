import React, { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";

const CardComponent = (props) => {
  const { repo } = props;
  const [languages, setLanguages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchLanguages = async (languages_url) => {
      const response = await fetch(languages_url, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        }
      });
      const data = await response.json();
      // console.log(Object.keys(data));
      setLanguages(Object.keys(data));
      setLoaded(true);
    };
    fetchLanguages(repo.languages_url);
  }, []);
  return (
    <div className="card-component" key={repo.id}>
      <div className="card-component__body">
        <p className="repo-name">{repo.name}</p>
        <p className="repo-desc">{repo.description?.substring(0, 120)}...</p>
        <div className="repo-languages">
          {loaded ? (
            <>
              {languages.map((language) => (
                <span className="repo-lang" key={language}>
                  {language}
                </span>
              ))}
            </>
          ) : (
            <LineWave color="#4a90cf" visible={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
