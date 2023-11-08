import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import SearchComponent from "./components/SearchComponent";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomeComponent />} />
        <Route path="/:username" exact element={<SearchComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
