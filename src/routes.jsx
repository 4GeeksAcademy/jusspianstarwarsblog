import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CharacterDetail from "./pages/CharacterDetail";
import PlanetDetail from "./pages/PlanetDetail";
import VehicleDetail from "./pages/VehicleDetail";


const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:uid" element={<CharacterDetail />} />
        <Route path="/planets/:uid" element={<PlanetDetail />} />
        <Route path="/vehicles/:uid" element={<VehicleDetail />} />
        <Route path="*" element={<h1 className="text-center mt-5">Not Found</h1>} />
      </Routes>
    </>
  );
};

export default AppRoutes;