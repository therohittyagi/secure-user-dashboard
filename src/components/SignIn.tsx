import React, { useRef, useState } from "react";

import BackgroundImage from "../assets/images/Background.jpg";
import { checkValidData } from "../utils/validate";
import { loginUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store"; // Import AppDispatch

const SignIn: React.FC = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = checkValidData(
      email.current?.value,
      password.current?.value
    );
    setErrorMessage(message);

    if (!message) {
      const emailValue = email.current?.value;
      const passwordValue = password.current?.value;

      if (emailValue && passwordValue) {
        try {
          const res = await dispatch(
            loginUser({
              email: emailValue,
              password: passwordValue,
            })
          ).unwrap(); // unwrap to get the resolved value
          console.log(res); // Handle successful login response here
          navigate("/dashboard");
        } catch (error) {
          setErrorMessage((error as any)?.error || "Login failed"); // Handle the error message
        }
      } else {
        setErrorMessage("Email and password are required.");
      }
    }
  };

  return (
    <div className="relative h-screen w-screen">
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
          <h1 className="w-full m-2 font-bold text-2xl">Sign In</h1>
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
            type="button"
            className="w-full p-3 m-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600"
            onClick={handleButtonClick}
          >
            Sign In
          </button>
          <p className="w-full p-3 m-2 py-4">
            New To Secure User Dashboard?{" "}
            <Link className="font-bold text-fuchsia-500" to={"/signup"}>
              Sign Up Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
