import React, { useEffect, useState } from "react";
import BackgroundImage from "../assets/images/Background.jpg";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await dispatch(getUsers()).unwrap();
        setUsers(res.data);
        navigate("/dashboard");
      } catch (error) {
        console.log((error as any)?.error || "Fetching users failed");
      }
    };
    fetchUsers();
  }, [dispatch, navigate]);

  return (
    <div className="absolute h-screen w-screen">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={BackgroundImage}
        alt="Background"
      />
      <div className="flex flex-col justify-center items-center h-full relative z-10 p-4">
        <h1 className="text-2xl font-bold md:text-3xl text-white mb-4">
          User Dashboard
        </h1>

        {/* Display user data in a scrollable container for small screens */}
        {users.length > 0 ? (
          <div className="grid-container overflow-x-auto sm:overflow-visible">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white">Loading users...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
