import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Contents from "../components/Contents";
import { BACKEND_URL, ENDPOINTS } from "../App";
import ItemCard from "../components/ItemCard";

type Iui = {
  reponse: {
    status: number;
    message: string;
  };
};

/**
 * Dynamická stránka, která získá všechny položky z backendu dle kategorie
 * @returns JSX.Element
 */
const CategoryPage = () => {
  const { category } = useParams();
  const [data, setData] = useState<any>();
  const [ui, setUi] = useState<Iui>({
    reponse: { status: 0, message: "loading" },
  });

  if (!ENDPOINTS.hasOwnProperty(category as string)) {
    return (
      <Contents>
        <h1 className="text-4xl font-bold text-white">
          404 - {category} not found
        </h1>
      </Contents>
    );
  }

  /**
   * Získávání položek z backendu dle kategorie
   * 
   * URL: /<kategorie>
   * @returns undefined
   */
  const fetchData = async () => {
    const res = await fetch(`${BACKEND_URL}/${ENDPOINTS[category as string]}`);
    const data = await res.json();
    if (res.status !== 200) {
      return setUi({
        ...ui,
        reponse: { status: res.status, message: data.message },
      });
    }
    delete data.message;
    delete data.count;
    const key = Object.keys(data)[0];
    setData(data[key]);
    setUi({ ...ui, reponse: { status: res.status, message: data.message } });
  };

  useEffect(() => {
    document.title = category;
    fetchData();
  }, [category]);

  if (ui.reponse.status === 0) {
    return (
      <Contents>
        <h1 className="text-4xl font-bold text-white">Loading...</h1>
      </Contents>
    );
  }

  if (ui.reponse.status !== 200) {
    return (
      <Contents>
        <h1 className="text-4xl font-bold text-white">
          {ui.reponse.status} {ui.reponse.message}
        </h1>
      </Contents>
    );
  }

  return (
    <Contents>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold text-white">Category: {category}</h1>
        <Link to="new" className="grid px-3 py-1 text-sm font-semibold bg-yellow-300 rounded place-items-center hover:brightness-90">
          <span>Create new</span>
        </Link>
      </div>

      <h2 className="my-8 text-2xl font-bold text-white text-white-5">
        All recent records
      </h2>
      <div className="grid gap-4 grid-auto-fit-xl">
        {data.map((item: any, index: number) => (
          <ItemCard key={index} {...item} category={category} />
        ))}
      </div>
    </Contents>
  );
};

export default CategoryPage;
