import React from "react";
import VideoCard from "../components/VideoCard";

function MyVideos() {
  return (
    <div className="h-full p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-5 items-left">
        <div className="text-lg font-semibold">My Videos</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </div>
  );
}

export default MyVideos;
