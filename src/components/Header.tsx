import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/slices/userSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className="fixed bg-indigo-900 top-0 w-full px-4 md:px-8 py-4 bg-gradient-to-b from-black z-20 flex align-middle ">
      <h1 className="font-bold text-2xl md:text-3xl text-fuchsia-500">
        Secure User Dashboard
      </h1>
      {token && (
        <button
          onClick={handleSignOut}
          className="text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md ml-auto"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
