import React from "react";
import Header from "./Header";
import BackgroundImage from "../assets/images/Background.jpg";

const Dashboard: React.FC = () => {
  return (
    <div className="relative h-screen w-screen">
      <Header />
      <img
        className="absolute h-full w-full object-cover z-0"
        src={BackgroundImage}
        alt="Background"
      />
      <div className="flex justify-center items-center h-full relative z-10">
        
      </div>
    </div>
  );
};

export default Dashboard;
