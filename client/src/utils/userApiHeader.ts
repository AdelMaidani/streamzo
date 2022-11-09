import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const header = {
  headers: {
    "x-api-key": token,
    "Content-Type": "application/json",
  },
};

export default header;
