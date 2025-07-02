import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store.jsx";

const CharacterCard = ({ item }) => {
  const { actions } = useContext(Context);
  const [details, setDetails] = useState(null);

  const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${item.uid}.jpg`;

   useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${item.uid}`)
      .then(res => res.json())
      .then(data => setDetails(data.result.properties))
      .catch(err => console.error(err));
  }, [item.uid]);

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={item.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          {details ? ( 
            <>
          <p className="card-text">Gender: {details.gender}</p>
          <p className="card-text">Hair Color: {details.hair_color}</p>
          <p className="card-text">Eye-Color: {details.eye_color}</p>
          </> ) : (
            <p>Getting info from SWAPI...</p>
          )}
          <Link to={`/characters/${item.uid}`} className="btn btn-primary me-2">
            Learn More
          </Link>
          <button
            className="btn btn-outline-warning"
            onClick={() => actions.addFavorite(item.name)}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

