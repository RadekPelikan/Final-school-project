import React from "react";

type ICotentsProps = {
  children: React.ReactNode;
};

const Contents = (props: ICotentsProps) => {
  return (
    <div className="flex-grow">
      <div className=" container px-8 py-10 bg-sky-700 rounded-xl min-h-[30rem]">
        {props.children}
      </div>
    </div>
  );
};

export default Contents;
