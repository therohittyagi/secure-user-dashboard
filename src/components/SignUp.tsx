import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";
import Header from "./Header";
import BackgroundImage from "../assets/images/Background.jpg";
import { checkValidSignUpData } from "../utils/validate";
import { AppDispatch } from "../redux/store"; // Ensure you have this import
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>(); // Type dispatch with AppDispatch

  const handleButtonClick = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default behavior
    const message = checkValidSignUpData(
      username.current?.value,
      email.current?.value,
      password.current?.value
    );
    setErrorMessage(message);
    if (!message) {
      try {
        const res = await dispatch(
          registerUser({
            username: username.current?.value || "",
            email: email.current?.value || "",
            password: password.current?.value || "",
          })
        ).unwrap(); // unwrap will help to get the resolved value or throw an error
        console.log(res); // Handle successful registration response here
      } catch (error: any) {
        setErrorMessage(error.error || "Registration failed"); // Handle the error message
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
          onSubmit={handleButtonClick}
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
            type="submit"
            className="w-full p-3 m-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600"
          >
            Sign Up
          </button>
          <p className="w-full p-3 m-2 py-4">
            Already Registered?{" "}
            <Link className="font-bold text-fuchsia-500" to={"/"}>
              Sign In Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
