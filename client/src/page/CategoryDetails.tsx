import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import LiveStreamCard from "../components/LiveStreamCard";
import VideoCard from "../components/VideoCard";

interface Istate {
  Category: {
    categoryName: string;
    categoryPicture: string;
    description: string;
  };
}

export default function CategoryDetails() {
  const Name = useParams();
  const [category, setCategory] = useState<Istate["Category"]>();

  useEffect(() => {
    const fetchCategoryData = async () => {
      const data = await axios.get(
        `http://localhost:5000/api/category/getSingleCategory/${Name.categoryName}`
      );
      setCategory(data.data[0]);
    };
    fetchCategoryData();
  }, [Name]);

  return (
    <div className="p-10 h-full flex flex-col items-center gap-10">
      <div className="flex gap-10 items-center">
        <CategoryCard
          CategoryName={category?.categoryName}
          ImgUrl={category?.categoryPicture}
        />
        <div>
          <div className="font-bold text-lg">{category?.categoryName}</div>
          <div>{category?.description}</div>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <div className="text-lg font-semibold">Live Right Now</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <LiveStreamCard />
          <LiveStreamCard />
          <LiveStreamCard />
        </div>
      </div>
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
