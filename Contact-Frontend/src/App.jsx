import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AddContactPage from "./components/AddContactPage";
import HomePage from "./components/HomePage";
import UpdateContact from "./components/UpdateContactPage"; 
import "./App.css";
const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage/>} />
      <Route path="/add-contact" element={<AddContactPage/>} />
      <Route path="/update-contact" element={<UpdateContact/>} />
    </>
  )
);

export default App;
