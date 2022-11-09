import axios from "axios";
import React, { useEffect, useState } from "react";
import header from "../utils/userApiHeader";

interface UserState {
  user: {
    fullName: string;
    profilePicture: string;
    email: string;
  };
}

function Profile() {
  const [user, setUser] = useState<UserState["user"]>();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/getUserData", header)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(user);
  return (
    <div className="p-10 flex flex-col items-center gap-5 h-screen">
      <div className="w-40 h-40">
        <img
          src={user?.profilePicture}
          className="rounded-full h-40 w-40 object-cover"
          alt="profilePicture"
        />
      </div>
      <span>{user?.fullName}</span>
      <span>{user?.email}</span>
      <button className="bg-black text-white p-3 duration-500 hover:bg-white hover:text-black border-2 border-black">
        Delete Account
      </button>
    </div>
  );
}

export default Profile;
