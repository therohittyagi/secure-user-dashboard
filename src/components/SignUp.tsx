import React, { useRef, useState } from "react";
import Header from "./Header";
import BackgroundImage from "../assets/images/Background.jpg";
import { checkValidSignUpData } from "../utils/validate";
import { signUp } from "../redux/slices/authService";
import { loginUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const SignUp: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const message = checkValidSignUpData(
      username.current?.value,
      email.current?.value,
      password.current?.value
    );
    setErrorMessage(message);
    if (!message) {
      try {
        const response = await signUp(
          username.current?.value || "",
          email.current?.value || "",
          password.current?.value || ""
        );
        dispatch(loginUser({ user: response.data.user, token: response.data.token }));
      } catch (error) {
        setErrorMessage('Failed to register');
      }
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
      <div className="flex justify-center items-center h-full relative z-10">
        <form
          className="p-8 bg-black bg-opacity-75 w-full max-w-md rounded-lg shadow-lg text-white"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleButtonClick();
          }}
        >
          <h1 className="w-full m-2 font-bold text-2xl">Sign Up</h1>
          <input
            type="text"
            placeholder="Username"
            ref={username}
            className="w-full p-3 m-2 text-black rounded"
          />
          <input
            type="text"
            placeholder="Email Address"
            ref={email}
            className="w-full p-3 m-2 text-black rounded"
          />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            className="w-full p-3 m-2 text-black rounded"
          />
          <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
          <button
            type="button" // Prevents default form submission
            className="w-full p-3 m-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600"
            onClick={handleButtonClick}
          >
            Sign Up
          </button>
          <p className="w-full p-3 m-2 py-4">Already Registered? Sign In Now</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
