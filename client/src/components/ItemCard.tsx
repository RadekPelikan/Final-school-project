import React, {useState, MouseEvent} from "react";
import {GiCancel} from "react-icons/gi"
import { Ianimal, Ibook, Icar, Itelephone } from "../interfaces/all.type";
import { BACKEND_URL, ENDPOINTS } from "../App";

type IitemCardProps = Ianimal | Icar | Itelephone | Ibook;

const ItemCard = (props: any) => {
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [cardVisible, setCardVisible] = useState<boolean>(true);

  const title = props.title ? props.title : props.name;
  const { category, _id, createdAt } = props;

  const cardData = { ...props };

  delete cardData._id;
  delete cardData.title;
  delete cardData.name;
  delete cardData.category;
  delete cardData.createdAt;

  const handleDelete = async (event: MouseEvent) => {
    event.preventDefault()
    await fetch(`${BACKEND_URL}/${ENDPOINTS[category]}/${_id}`, {
      method: "DELETE"
    })
    setCardVisible(false)
  }

  if (!cardVisible) return null;

  return (
    <div className="px-4 py-4 text-white rounded-lg bg-slate-800"
    onMouseEnter={() => setDeleteVisible(true)}
    onMouseLeave={() => setDeleteVisible(false)}
    >

      <div className="grid items-baseline justify-between grid-cols-3 px-3">
        <span className="text-gray-400">{category}</span>
        <h3 className="text-xl font-bold text-center text-white">{title}</h3>
        <GiCancel className={`text-slate-300 ml-auto h-full hover:text-red-600 ${deleteVisible ? "" : "hidden"}`} size={25}
        onClick={handleDelete}/>
      </div>
      
      {Object.keys(cardData).map((key: string, index) => {
        let value = cardData[key];
        if (key.endsWith("Type")) key = key.slice(0, -4);
        return (
          <div key={index} className="flex justify-between px-3 rounded bg-inherit hover:brightness-125">
            <p className="text-white">
              {key}
            </p>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ItemCard;
