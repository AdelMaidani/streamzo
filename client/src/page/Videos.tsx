import React from "react";
import VideoCard from "../components/VideoCard";

function Videos() {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-lg font-semibold">Previous Streams</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </div>
  );
}

export default Videos;
