import React, { useContext } from "react";
import { Context } from "../store.jsx";
import CharacterCard from "../components/CharacterCard.jsx";
import PlanetCard from "../components/PlanetCard.jsx";
import VehicleCard from "../components/VehicleCard.jsx";

const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="container">
      <h2>Characters</h2>
      <div className="row">
        {store.characters.map((item) => (
          <CharacterCard key={item.uid} item={item} />
        ))}
      </div>

      <h2 className="mt-4">Planets</h2>
      <div className="row">
        {store.planets.map((item) => (
          <PlanetCard key={item.uid} item={item} />
        ))}
      </div>

      <h2 className="mt-4">Vehicles</h2>
      <div className="row">
        {store.vehicles.map((item) => (
          <VehicleCard key={item.uid} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
