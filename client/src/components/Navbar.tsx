import React from "react";
import { Link } from "react-router-dom";

type INavbarProps = {
  items: route[];
};

type route = {
  type: string;
  name: string;
  to: string;
};

/**
 * Navbar pro navigaci mezi stránkami
 * @param props INavbarProps
 * @returns JSX.Element
 */
const Navbar = (props: INavbarProps) => {
  return (
    <nav className=" bg-sky-600">
      <ul className="container flex justify-between">
        {props.items.map((item, index) => (
          <li key={index}>
            {item.type === "brand" && (
              <Link
                className="block px-10 py-2 text-xl font-bold text-white hover:bg-sky-700 mr-[15rem]"
                to={item.to}
              >
                {item.name}
              </Link>
            )}
            {item.type === "link" && (
              <Link
                className="grid h-full min-w-[8rem] place-items-center hover:bg-sky-700 text-white"
                to={item.to}
              >
                <span>{item.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
