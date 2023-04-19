import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { keys } from 'ts-transformer-keys'

import { HomePage, CategoryPage, NewItemwPage } from "./pages";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import { Ianimal } from "./interfaces/all.type";

export const BACKEND_URL = "http://localhost:3000";

/**
 * @description
 * Překládání kategorií na endpointy
 * 
 * endpoint: {
 * category: endpoint (string)
 * }
 */
export const ENDPOINTS = {
  animal: "step",
  car: "srac",
  telephone: "senohp",
  book: "skooby",
  animals: "step",
  cars: "srac",
  telephones: "senohp",
  books: "skooby",
}

/**
 * @description
 * Dynamické vytváření navbaru
 * 
 * navbarItem: {
 * type,
 * name,
 * to
 * }
 */
const NAVBAR_LINKS = [
  { type: "brand", name: "Home", to: "/" },
  { type: "link", name: "Animals", to: "/animals"},
  { type: "link", name: "Cars", to: "/cars" },
  { type: "link", name: "Telephones", to: "/telephones" },
  { type: "link", name: "Books", to: "/books" },
];

/**
 * Samotná aplikace
 * @returns JSX.Element
 */
function App() {
  return (
    <>  
      <Layout>
        <Navbar items={NAVBAR_LINKS} />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/new" element={<NewItemwPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
