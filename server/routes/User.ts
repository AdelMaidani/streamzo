import { Router } from "express";
import getUserData from "../controllers/User/GetUserData";
import loggedIn from "../controllers/User/loggedIn";
import { loginUser, registerUser } from "../controllers/User/RegisterLogin";
import { verifyAuth } from "../middleware/authVerify";

const UserRoutes = Router();

UserRoutes.post("/register", registerUser);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/loggedIn", verifyAuth, loggedIn);
UserRoutes.get("/getUserData", verifyAuth, getUserData);

export default UserRoutes;
