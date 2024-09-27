import React, { useEffect } from "react";
import Header from "./Header";
import BackgroundImage from "../assets/images/Background.jpg";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await dispatch(getUsers()).unwrap();
      console.log(res);
      navigate("/dashboard");
    } catch (error) {
      console.log((error as any)?.error || "Login failed");
    }
  };
  return (
    <div className="relative h-screen w-screen">
      <Header />
      <img
        className="absolute h-full w-full object-cover z-0"
        src={BackgroundImage}
        alt="Background"
      />
      <div className="flex justify-center items-center h-full relative z-10"></div>
    </div>
  );
};

export default Dashboard;
