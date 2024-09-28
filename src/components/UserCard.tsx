import React from "react";

interface UserCardProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-indigo-900 shadow-lg rounded-lg overflow-hidden m-2 sm:m-4 max-w-full sm:max-w-xs flex flex-col items-center text-center p-4">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-md sm:text-lg font-semibold text-fuchsia-500">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-sm sm:text-base text-fuchsia-600">{user.email}</p>
    </div>
  );
};

export default UserCard;
