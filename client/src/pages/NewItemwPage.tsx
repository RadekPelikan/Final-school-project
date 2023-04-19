import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Contents from "../components/Contents";
import { BACKEND_URL, ENDPOINTS, KEYS } from "../App";

type Iui = {
  reponse: {
    keys?: string[];
    status: number;
    message: string;
  };
};

/**
 * Dynamická stránka, která vytvoří formulář dle kategorie
 * @returns
 */
const NewItemwPage = () => {
  const inputRefs = useRef<any[]>([]);
  const navigate = useNavigate();
  const { category } = useParams();

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
   * Získávání klíčových sloves z backendu dle kategorie, podle kterých se pak dynamicky vytvoří formulář
   *
   * URL: /<kategorie>/info
   * @returns undefined
   */
  const fetchInfo = async () => {
    const res = await fetch(`${BACKEND_URL}/${ENDPOINTS[category]}/info`);
    const data = await res.json();
    setUi({
      ...ui,
      reponse: { keys: data.keys, status: res.status, message: data.message },
    });
  };

  useEffect(() => {
    document.title = category;
    fetchInfo();
  }, [category]);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: any = {};
    inputRefs.current.forEach((input) => {
      data[input.name] = input.value;
    });

    fetch(`${BACKEND_URL}/${ENDPOINTS[category]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        navigate(`/${category}`);
      }
    });
  };

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
      <h1 className="text-4xl font-bold text-center text-white md:text-left">
        New{" "}
        {category?.endsWith("s")
          ? category.substring(0, category.length - 1)
          : category}
      </h1>
      <form className="lg:mr-[20%] grid gap-5" onSubmit={handleCreate}>
        <div className="grid gap-x-10 gap-y-2 grid-auto-fit-xs">
          {ui.reponse.keys?.map((key, index) => (
            <div key={index} className="grid">
              <label className="text-white semibold text" htmlFor={key}>
                {key}
              </label>
              <input
                className="px-2 py-1 text-sm rounded outline-none"
                type="text"
                name={key}
                id={key}
                ref={(el) => (inputRefs.current[index] = el)}
                required
              />
            </div>
          ))}
        </div>
        <button
          className="py-1.5 font-semibold text-white bg-green-500 rounded -white text"
          type="submit"
        >
          Create
        </button>
      </form>
    </Contents>
  );
};

export default NewItemwPage;
