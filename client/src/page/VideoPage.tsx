import React from "react";
import CategoryCard from "../components/CategoryCard";

function VideoPage() {
  return (
    <div>
      <div className="p-10 h-full flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="bg-black md:w-6/12 h-72"></div>
          <div className="hidden md:block">
            <CategoryCard CategoryName="" ImgUrl="" />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-black h-20 w-20 rounded-full"></div>
          <div>Talia Mar</div>
          <div>Lets play call of duty</div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
          assumenda. Dolorum quis eos dicta consequatur, dolor ab ea repellendus
          fuga velit autem error. Blanditiis numquam quae dolorum laborum eum
          veritatis.
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
