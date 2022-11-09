import React from "react";
import { Link } from "react-router-dom";

const LiveStreamCard = () => {
  return (
    <Link
      to="/liveStreamingPage"
      className="shadow-lg hover:shadow-2xl duration-300 border p-2 border-black flex flex-col w-72 gap-1 items-center"
    >
      <div className="h-32 w-60 bg-black"></div>
      <span className="truncate font-bold">London Vlog</span>
      <span className="truncate text-gray-500 hover:text-black">
        IRL stream
      </span>
      <span className="truncate">Talia mar</span>
    </Link>
  );
};

export default LiveStreamCard;
