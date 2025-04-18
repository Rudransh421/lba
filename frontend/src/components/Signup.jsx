import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PasswordInput from "./PasswordInput.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Store error message

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on new attempt

    try {
      const response = await axios.post(
        "http://localhost:8000/user/signup",
        formData,
        { withCredentials: true }
      );

      if (response.data.message === "user do exist") {
        setErrorMessage("User already exists. Please log in.");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      console.log(error.response)
      console.log(backendMessage)
      setErrorMessage(backendMessage || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          onChange={handleChange}
          className="border border-black p-2 m-2 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border border-black p-2 m-2 rounded-lg"
          required
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="border border-black p-2 m-2 bg-green-600 rounded-2xl text-white"
        >
          Signup
        </button>
      </form>

      {errorMessage && (
        <p className="text-red-600 font-medium mt-2">{errorMessage}</p>
      )}

      <Link
        to="/login"
        className="text-blue-500 hover:text-amber-800 active:text-red-600 mt-2"
      >
        Already have an account? Log in
      </Link>
    </div>
  );
};

export default Signup;
