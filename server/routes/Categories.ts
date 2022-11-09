import { Router } from "express";
import {
  addCategory,
  getCategory,
  getCategoryList,
} from "../controllers/Category/AddGetCategory";

const CategoryRoutes = Router();

CategoryRoutes.post("/addCategory", addCategory);
CategoryRoutes.get("/getCategory", getCategoryList);
CategoryRoutes.get("/getSingleCategory/:categoryName", getCategory);

export default CategoryRoutes;
