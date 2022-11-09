import { Request, Response } from "express";

const getUserData = (req: Request, res: Response) => {
  const profilePicture = res.locals.userData[0].profilePicture;
  const email = res.locals.userData[0].email;
  const fullName = res.locals.userData[0].fullName;

  res.send({ profilePicture, email, fullName });
};

export default getUserData;
