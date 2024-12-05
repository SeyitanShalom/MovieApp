import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-32">
      <h1 className="text-5xl font-bold">404</h1>
      <h5 className="text-xl">
        {" "}
        The page you're looking for could not be found
      </h5>
      <Link to={"/"} className=" text-orange-500 hover:underline">
        Back to HomePage
      </Link>
    </div>
  );
}
