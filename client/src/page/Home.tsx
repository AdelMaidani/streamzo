import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import LiveStreamCard from "../components/LiveStreamCard";
import StreamerCard from "../components/StreamerCard";
import VideoCard from "../components/VideoCard";

interface IState {
  Category: {
    categoryName: string;
    categoryPicture: string;
  }[];
}

function Home() {
  const [categories, setCategories] = useState<IState["Category"]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const data = await axios.get(
        "http://localhost:5000/api/category/getCategory"
      );
      setCategories(data.data);
    };

    getCategory();
  }, []);

  return (
    <div className="pt-5 pb-5 flex flex-col gap-10">
      {/* Category Section */}
      <div className="flex flex-col gap-5 items-center">
        <div className="text-lg font-semibold">Categories</div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((data) => (
            <CategoryCard
              ImgUrl={data.categoryPicture}
              CategoryName={data.categoryName}
              key={data.categoryPicture}
            />
          ))}
        </div>
      </div>

      {/* Popular Streamer Section */}
      <div className="flex flex-col gap-5 items-center">
        <div className="text-lg font-semibold">Popular Streamers</div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          <StreamerCard />
          <StreamerCard />
          <StreamerCard />
          <StreamerCard />
          <StreamerCard />
        </div>
      </div>

      {/* Live Right Now Section */}
      <div className="flex flex-col gap-5 items-center">
        <div className="text-lg font-semibold">Live Right Now</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <LiveStreamCard />
          <LiveStreamCard />
          <LiveStreamCard />
        </div>
      </div>

      {/* Previous Streams Section */}
      <div className="flex flex-col gap-5 items-center">
        <div className="text-lg font-semibold">Previous Streams</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
