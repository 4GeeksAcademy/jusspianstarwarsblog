import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlanetDetail = () => {
  const { uid } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${uid}`)
      .then(res => res.json())
      .then(data => setPlanet(data.result.properties))
      .catch(err => console.error(err));
  }, [uid]);

  const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/planets/${uid}.jpg`;

  return (
    <div className="planet-detail-page">
      {planet ? (
        <>
          <div className="planet-top">
            <img
              src={imageUrl}
              alt={planet.name}
              className="planet-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
            />
            <div className="planet-view">
              <h1>{planet.name}</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>

          <hr className="red-divider" />

          <div className="planet-attributes">
            <div className="attribute">
              <span className="label">Climate</span>
              <span className="value">{planet.climate}</span>
            </div>
            <div className="attribute">
              <span className="label">Population</span>
              <span className="value">{planet.population}</span>
            </div>
            <div className="attribute">
              <span className="label">Terrain</span>
              <span className="value">{planet.terrain}</span>
            </div>
            <div className="attribute">
              <span className="label">Gravity</span>
              <span className="value">{planet.gravity}</span>
            </div>
            <div className="attribute">
              <span className="label">Orbital Period</span>
              <span className="value">{planet.orbital_period}</span>
            </div>
          </div>
        </>
      ) : (
        <p>Getting info from SWAPI...</p>
      )}
    </div>
  );
};

export default PlanetDetail;