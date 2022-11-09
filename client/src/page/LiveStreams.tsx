import React from "react";
import LiveStreamCard from "../components/LiveStreamCard";

function LiveStreams() {
  return (
    <div>
      <div className="flex flex-col gap-5 p-10 items-center">
        <div className="text-lg font-semibold">Live right now</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <LiveStreamCard />
        </div>
      </div>
    </div>
  );
}

export default LiveStreams;
