import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";

interface IState {
  Category: {
    categoryName: string;
    categoryPicture: string;
  }[];
}

function Categories() {
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
    <div className="p-10">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-lg font-semibold">Categories</div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((data) => (
            <CategoryCard
              ImgUrl={data.categoryPicture}
              CategoryName={data.categoryName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
