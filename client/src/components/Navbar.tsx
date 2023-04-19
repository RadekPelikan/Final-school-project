import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

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
  const [open, setOpen] = React.useState(false);

  return (
    <nav className=" bg-sky-600">
      <ul className="container flex flex-col justify-between gap-1 my-2 md:flex-row md:my-0">
        {props.items.map((item, index) => (
          <li key={index}>
            {item.type === "brand" && (
              <>
                <Link
                  className="rounded md:rounded-none block text-center md:text-left px-10 py-2 text-xl font-bold text-white hover:bg-sky-700  md:mr-[5rem] lg:mr-[15rem]"
                  to={item.to}
                >
                  {item.name}
                </Link>
                <button
                  className="grid gap-[2px] py-2 w-full md:hidden hover:brightness-75 relative"
                  onClick={() => setOpen(!open)}
                >
                  <div className="h-0.5 bg-white"></div>
                  <div className="h-0.5 bg-white"></div>
                  {!open && (
                    <>
                      <HiOutlineChevronDown
                        className="absolute left-0 text-white top-3"
                        size={30}
                      />
                      <HiOutlineChevronDown
                        className="absolute right-0 text-white top-3"
                        size={30}
                      />
                    </>
                  )}
                  {open && (
                    <>
                      <HiOutlineChevronUp
                        className="absolute left-0 text-white top-3"
                        size={30}
                      />
                      <HiOutlineChevronUp
                        className="absolute right-0 text-white top-3"
                        size={30}
                      />
                    </>
                  )}
                </button>
              </>
            )}

            {item.type === "link" && (
              <Link
                className={`mx-8 md:mx-0 rounded md:rounded-none grid h-full min-w-[8rem] place-items-center hover:bg-sky-700 text-white ${open ? "" : "hidden"} md:grid`}
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
