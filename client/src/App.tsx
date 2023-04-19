import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

export const BACKEND_URL = "http://localhost:3000";

export const ENDPOINTS = {
  animal: "step",
  car: "srac",
  telephone: "senohp",
  book: "skooby",
}

const NAVBAR_LINKS = [
  { type: "brand", name: "Home", to: "/" },
  { type: "link", name: "Animals", to: "/animals"},
  { type: "link", name: "Cars", to: "/cars" },
  { type: "link", name: "Telephones", to: "/telephones" },
  { type: "link", name: "Books", to: "/books" },
];

function App() {
  return (
    <>  
      <Layout>
        <Navbar items={NAVBAR_LINKS} />
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
