import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const auth = true;
const UserContext = createContext(auth);

interface Props {
  children?: React.ReactNode;
}

export function UserProvider({ children }: Props) {
  const [auth, setAuth] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get("token");

  axios
    .get("http://localhost:5000/api/user/loggedIn", {
      headers: {
        "x-api-key": token,
      },
    })
    .then((res) => {
      if (res.data.authentication === true) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
}

export default UserContext;
