import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

export default function Login({ user, setUser }) {
  // const [details, setDetails] = useState({
  //   email: "",
  //   password: "",
  // });

  const [details, updateDetails] = useImmer({ email: "", password: "" });
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    updateDetails((draft) => {
      draft.email = e.target.value;
    });
    console.log(details.email);
  };

  const handlePasswordChange = (e) => {
    updateDetails((draft) => {
      draft.password = e.target.value;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.email && details.password) {
      setUser({ email: details.email, password: details.password });
      navigate("/homepage");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className=" container flex justify-center items-center h-screen text-black">
      <div className=" bg-blue-300 w-[500px]  p-12 rounded-xl">
        <h1 className="text-center font-black text-xl">Login</h1>
        <p className="text-center">
          Don't have an account? {""}
          <Link
            to={"/signup "}
            className="text-orange-500 font-bold hover:underline transition cursor-pointer"
          >
            Signup
          </Link>
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  items-center justify-center mt-5"
        >
          <label htmlFor="email" className=" w-full text-sm font-semibold mb-3">
            Email:
            <input
              type="email"
              onChange={handleEmailChange}
              id="email"
              value={details.email}
              className="block w-full px-3 py-2 outline-none rounded-md mt-1"
            />
          </label>
          <label
            htmlFor="password"
            className=" w-full text-sm font-semibold mb-3"
          >
            Password:
            <input
              type="password"
              onChange={handlePasswordChange}
              id="password"
              value={details.password}
              className="block w-full px-3 py-2 outline-none rounded-md mt-1"
            />
          </label>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 transition w-full rounded-lg py-2 font-bold text-white mt-3 cursor-pointer "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
