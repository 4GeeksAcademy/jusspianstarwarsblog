import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VehicleDetail = () => {
  const { uid } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/vehicles/${uid}`)
      .then((res) => res.json())
      .then((data) => setVehicle(data.result.properties))
      .catch((err) => console.error(err));
  }, [uid]);

  const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/vehicles/${uid}.jpg`;

  return (
    <div className="vehicle-detail-page">
      {vehicle ? (
        <>
          <div className="vehicle-top">
            <img
              src={imageUrl}
              alt={vehicle.name}
              className="vehicle-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
            />
            <div className="vehicle-view">
              <h1>{vehicle.name}</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>

          <hr className="red-divider" />

          <div className="vehicle-attributes">
            <div className="attribute">
              <span className="label">Model</span>
              <span className="value">{vehicle.model}</span>
            </div>
            <div className="attribute">
              <span className="label">Manufacturer</span>
              <span className="value">{vehicle.manufacturer}</span>
            </div>
            <div className="attribute">
              <span className="label">Crew</span>
              <span className="value">{vehicle.crew}</span>
            </div>
            <div className="attribute">
              <span className="label">Cost in Credits</span>
              <span className="value">{vehicle.cost_in_credits}</span>
            </div>
            <div className="attribute">
              <span className="label">Passengers</span>
              <span className="value">{vehicle.passengers}</span>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VehicleDetail;
