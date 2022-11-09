import { Request, Response } from "express";
import CategorySchema from "../../models/Categories";

const addCategory = async (req: Request, res: Response) => {
  const add = new CategorySchema({
    categoryName: req.body.categoryName,
    categoryPicture: req.body.categoryPicture,
    description: req.body.description,
  });

  try {
    const SaveData = await add.save();
    res.send(SaveData);
  } catch {
    res.send(400);
  }
};

const getCategoryList = (req: Request, res: Response) => {
  CategorySchema.find({})
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

const getCategory = (req: Request, res: Response) => {
  CategorySchema.find({
    categoryName: { $in: req.params.categoryName },
  })
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

export { addCategory, getCategoryList, getCategory };
