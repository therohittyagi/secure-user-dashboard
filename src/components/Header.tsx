import React from "react";

const Header: React.FC = () => {
  return (
    <div className="fixed bg-indigo-900 top-0 w-full px-4 md:px-8 py-4 bg-gradient-to-b from-black z-20">
      <h1 className=" font-bold text-2xl md:text-3xl text-fuchsia-500">
        Secure User Dashboard
      </h1>
    </div>
  );
};

export default Header;
