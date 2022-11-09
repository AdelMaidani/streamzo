import React from "react";
import { Link } from "react-router-dom";

type Props = {
  ImgUrl?: string;
  CategoryName?: string;
};

function CategoryCard({ ImgUrl, CategoryName }: Props) {
  return (
    <div>
      <Link to={`/${CategoryName}`}>
        <div className="border p-2 w-48 shadow-lg hover:shadow-2xl duration-300 border-black flex flex-col gap-1 items-center">
          <div className="h-60 w-40 bg-black">
            <img src={ImgUrl} alt="Category" className="h-full" />
          </div>
          <div>{CategoryName}</div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
