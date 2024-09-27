import React, { useRef, useState } from "react";
import Header from "./Header";
import BackgroundImage from "../assets/images/Background.jpg";
import { checkValidData } from "../utils/validate";
import { signIn } from "../redux/slices/authService";
import { loginUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const message = checkValidData(
      email.current?.value,
      password.current?.value
    );
    setErrorMessage(message);
    if (!message) {
      try {
        const response = await signIn(
          email.current?.value || "",
          password.current?.value || ""
        );
        dispatch(
          loginUser({ user: response.data.user, token: response.data.token })
        );
        navigate("/dashboard");
      } catch (error) {
        setErrorMessage("Invalid credentials");
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
            e.preventDefault();
            handleButtonClick();
          }}
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
            type="button" // Prevents default form submission
            className="w-full p-3 m-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600"
            onClick={handleButtonClick}
          >
            Sign In
          </button>
          <p className="w-full p-3 m-2 py-4">
            New To Secure User Dashboard? Sign Up Now
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
