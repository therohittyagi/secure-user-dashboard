import React from "react";
import Header from "./Header";
import BackgroundImage from "../assets/images/Background.jpg";

const SignUp = () => {
  return (
    <div className="relative h-screen w-screen">
      <Header />
      <img
        className="absolute h-full w-full object-cover z-0"
        src={BackgroundImage}
        alt="BackgroundImage"
      />
      <div className="flex justify-center items-center h-full relative z-10">
        <form className="p-8 bg-black bg-opacity-75 w-full max-w-md rounded-lg shadow-lg text-white">
          <h1 className="w-full  m-2 font-bold text-2xl">Sign Up</h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 m-2 text-black rounded"
          />
          <input
            type="text"
            placeholder="Email Address"
            className="w-full p-3 m-2 text-black rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 m-2 text-black rounded"
          />
          <button className="w-full p-3 m-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600">
            Sign Up
          </button>
          <p className="w-full p-3 m-2 py-4">Already Registered? Sign In Now</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
