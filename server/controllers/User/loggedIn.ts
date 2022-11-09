import { Request, Response } from "express";

const loggedIn = (req: Request, res: Response) => {
  const authentication = res.locals.authentication;
  const userName = res.locals.userData[0].userName;
  const profilePicture = res.locals.userData[0].profilePicture;
  const id = res.locals.userData[0].id;

  res.send({ authentication, userName, profilePicture, id });
};

export default loggedIn;
