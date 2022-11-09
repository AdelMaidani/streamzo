import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const PrivateRoute = () => {
  const User = useContext(UserContext);

  return User ? <Outlet /> : <Navigate to={"/login"} />;
};

export { PrivateRoute };
