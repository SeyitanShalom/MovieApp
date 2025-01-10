import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

export default function Signup({ setAuthenticated, authenticated }) {
  const [details, setDetails] = useImmer({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setDetails((draft) => {
      draft.name = e.target.value;
      console.log(details.name);
    });
  };

  const handleEmailChange = (e) => {
    setDetails((draft) => {
      draft.email = e.target.value;
    });
  };

  const handlePasswordChange = (e) => {
    setDetails((draft) => {
      draft.password = e.target.value;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!name || !email || !password) return;
    if (!authenticated) return;
    setAuthenticated(true);
    navigate("/homepage");
  };

  return (
    <div className="container flex justify-center items-center h-screen text-black">
      <div className=" bg-blue-300 w-[500px]  p-12 rounded-xl">
        <h1 className="text-center font-black text-xl">Signup</h1>
        <p className="text-center">
          Already have an account? {""}
          <Link
            to={"/"}
            className="text-orange-500 font-bold hover:underline transition cursor-pointer"
          >
            Login
          </Link>
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  items-center justify-center mt-5"
        >
          <label
            htmlFor="fullname"
            className=" w-full text-sm font-semibold inline-block mb-3"
          >
            Full Name:
            <input
              type="text"
              onChange={handleNameChange}
              value={details.name}
              id="fullname"
              className="block w-full px-3 py-2 outline-none rounded-md mt-1"
            />
          </label>
          <label htmlFor="email" className=" w-full text-sm font-semibold mb-3">
            Email:
            <input
              type="email"
              onChange={handleEmailChange}
              value={details.email}
              id="email"
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
              value={details.password}
              id="password"
              className="block w-full px-3 py-2 outline-none rounded-md mt-1"
            />
          </label>
          <input
            type="submit"
            value="Signup"
            className="bg-orange-500 hover:bg-orange-400 transition w-full rounded-lg py-2 font-bold text-white mt-3 cursor-pointer "
          />
        </form>
      </div>
    </div>
  );
}
