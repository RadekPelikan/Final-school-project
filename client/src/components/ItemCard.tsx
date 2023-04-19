import React, { useState, MouseEvent } from "react";
import { GiCancel } from "react-icons/gi";
import { Ianimal, Ibook, Icar, Itelephone } from "../interfaces/all.type";
import { BACKEND_URL, ENDPOINTS } from "../App";

type Iui = {
  deleteVisible: boolean;
  cardVisible: boolean;
};

type IitemCardProps = Ianimal | Icar | Itelephone | Ibook;

/**
 * Kartička položky pro zobrazování dat
 * @param props any
 * @returns JSX.Element
 */
const ItemCard = (props: any) => {
  const [ui, setUi] = useState<Iui>({
    deleteVisible: false,
    cardVisible: true,
  });

  const title = props.title ? props.title : props.name;
  const { category, _id, createdAt } = props;

  const cardData = { ...props };

  delete cardData._id;
  delete cardData.title;
  delete cardData.name;
  delete cardData.category;
  delete cardData.createdAt;

  const handleDelete = async (event: MouseEvent) => {
    event.preventDefault();
    await fetch(`${BACKEND_URL}/${ENDPOINTS[category]}/${_id}`, {
      method: "DELETE",
    });
    setUi({ ...ui, cardVisible: false });
  };

  if (!ui.cardVisible) return null;

  return (
    <div
      className="grid gap-2 px-1 py-4 text-white rounded-lg sm:px-4 bg-slate-800"
      onMouseEnter={() => setUi({ ...ui, deleteVisible: true })}
      onMouseLeave={() => setUi({ ...ui, deleteVisible: false })}
    >
      <div className="grid items-baseline justify-between grid-cols-3 px-3">
        <span className="text-gray-400">{category}</span>
        <h3 className="text-xl font-bold text-center text-white">{title}</h3>
        <GiCancel
          className={`sm:text-slate-300 ml-auto h-full text-red-600  hover:text-red-600 ${
            ui.deleteVisible ? "" : "sm:hidden"
          }`}
          size={25}
          onClick={handleDelete}
        />
      </div>

      <ul className="bg-inherit">
        {Object.keys(cardData).map((key: string, index) => {
          let value = cardData[key];
          if (key.endsWith("Type")) key = key.slice(0, -4);
          return (
            <li
              key={index}
              className="flex justify-between px-3 rounded bg-inherit hover:brightness-125"
            >
              <p className="text-white">{key}</p>
              <p>{value}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemCard;
