import React from "react";
import { Link } from "react-router-dom";

function StreamerCard() {
  return (
    <Link to={""}>
      <div className="shadow-lg hover:shadow-2xl duration-300 border p-2 w-48 border-black flex flex-col gap-1 items-center">
        <div className="h-60 w-40 bg-black"></div>
        <div>Talia Mar</div>
      </div>
    </Link>
  );
}

export default StreamerCard;
