import React, { useEffect, useId, useState } from "react";
import Contents from "../components/Contents";
import { BACKEND_URL } from "../App";
import { IallSorted } from "../interfaces/all.type";
import ItemCard from "../components/ItemCard";

type Iui = {
  reponse: {
    status: number;
    message: string;
  };
};

const Homepage = () => {
  const [ui, setUi] = useState<Iui>({
    reponse: { status: 0, message: "loading" },
  });
  const [data, setData] = useState<IallSorted>();

  const fetchData = async () => {
    const res = await fetch(`${BACKEND_URL}/all`);
    const data = await res.json();
    console.log(data)
    if (res.status !== 200) {
      setUi({
        ...ui,
        reponse: { status: res.status, message: res.statusText },
      });
      return;
    }
    setData(data);
    setUi({ ...ui, reponse: { status: res.status, message: res.statusText } });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <h1 className="text-4xl font-bold text-white">Homepage</h1>

      <h2 className="my-8 text-2xl font-bold text-white text-white-5">All recent records</h2>
      <div className="grid gap-4 grid-auto-fit">
        {data?.all.map((item, index) => (
          <ItemCard {...item} key={index} />
        ))}
      </div>
    </Contents>
  );
};

export default Homepage;
