import React, { useEffect, useState } from "react";
import StreamzoLogo from "../Assets/streamzo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import axios from "axios";
import arrow from "../Assets/icons/expand.png";
import menu from "../Assets/icons/menu.png";

interface Istate {
  user: string;
  profilePicture: string;
}

function Nav() {
  const cookies = new Cookie();
  const navigate = useNavigate();
  const token = cookies.get("token");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileVeiw, setMobileVeiw] = useState(false);
  const [user, setUser] = useState<Istate["user"]>();
  const [profilePicture, setProfilePicture] =
    useState<Istate["profilePicture"]>();

  function showMenuTriger() {
    setShowMenu(!showMenu);
  }

  const handleMobileVeiw = () => {
    if (window.innerWidth > 768) {
      setMobileVeiw(false);
    }
  };

  function logout() {
    cookies.remove("token", { path: "/", domain: "localhost" });
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener("resize", handleMobileVeiw);
  }, []);

  useEffect(() => {
    if (!token) {
    } else {
      axios
        .get("http://localhost:5000/api/user/loggedIn", {
          headers: {
            "x-api-key": token,
          },
        })
        .then((res) => {
          if (res.data.authentication === true) {
            setLoggedIn(true);
            setUser(res.data.userName);
            setProfilePicture(res.data.profilePicture);
          } else {
            setLoggedIn(false);
          }
        });
    }
  }, [token]);

  return (
    <div className="sticky top-0 z-50">
      <div className="flex p-2 z-40 w-full justify-between h-20 border-1 bg-white border-gray-100 shadow-xl items-center">
        <Link to={"/"}>
          <img
            className="h-20 rounded-full hover:rotate-90 duration-500 rota"
            src={StreamzoLogo}
            alt="Logo"
          />
        </Link>
        <div className="hidden md:flex gap-5 items-center">
          <NavLink
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: isActive ? "8px" : "none",
              border: isActive ? "none" : "",
            })}
            to="/liveStreams"
            className="border p-2 border-black hover:bg-black hover:text-white duration-300"
          >
            Live
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: isActive ? "8px" : "none",
              border: isActive ? "none" : "",
            })}
            to="/categories"
            className="border p-2 border-black hover:bg-black hover:text-white duration-300"
          >
            Category
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: isActive ? "8px" : "none",
              border: isActive ? "none" : "",
            })}
            to="/videos"
            className="border p-2 border-black hover:bg-black hover:text-white duration-300"
          >
            Videos
          </NavLink>
        </div>
        <div className="md:hidden">
          <img
            src={menu}
            alt="menu"
            onClick={() => setMobileVeiw(!mobileVeiw)}
            className="h-10 hover:rotate-90 duration-500"
          />
        </div>
        <div className="hidden md:flex gap-5">
          {loggedIn ? (
            <div className="w-40">
              <div
                className="flex gap-2 items-center cursor-pointer hover:underline underline-offset-4"
                onClick={showMenuTriger}
              >
                <img
                  src={profilePicture}
                  className="rounded-full object-cover h-10 w-10"
                  alt=""
                />
                <span>{user}</span>
                <img src={arrow} className="h-5" alt="" />
              </div>
              {showMenu ? (
                <div className="flex flex-col border-2 absolute mt-6 items-center bg-black w-40 text-white">
                  <NavLink
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "white" : "",
                      color: isActive ? "black" : "",
                    })}
                    to="/profile"
                    onClick={() => setShowMenu(!showMenu)}
                    className="hover:bg-white hover:text-black w-full p-2 duration-500"
                  >
                    My profile
                  </NavLink>
                  <NavLink
                    to="/myVideos"
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "white" : "",
                      color: isActive ? "black" : "",
                    })}
                    onClick={() => setShowMenu(!showMenu)}
                    className="hover:bg-white hover:text-black w-full p-2 duration-500"
                  >
                    My videos
                  </NavLink>
                  <NavLink
                    to="/goLive"
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "white" : "",
                      color: isActive ? "black" : "",
                    })}
                    onClick={() => setShowMenu(!showMenu)}
                    className="hover:bg-white hover:text-black w-full p-2 duration-500"
                  >
                    Go live
                  </NavLink>
                  <div
                    onClick={logout}
                    className=" cursor-pointer hover:bg-white hover:text-black w-full p-2 duration-500"
                  >
                    Logout
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="flex gap-5">
              <NavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: isActive ? "8px" : "none",
                  border: isActive ? "none" : "",
                  backgroundColor: isActive ? "white" : "black",
                  color: isActive ? "black" : "white",
                })}
                to="/signup"
                className="bg-black text-white duration-300 hover:bg-white hover:text-black border border-black p-2 "
              >
                Sign Up
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: isActive ? "8px" : "none",
                  border: isActive ? "none" : "",
                })}
                to="/login"
                className="border border-black  p-2 duration-300"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu View */}
      <div
        className={` bg-black h-screen w-full flex-col items-center pt-10 gap-10  ${
          mobileVeiw ? "flex" : "hidden"
        }`}
      >
        <NavLink
          to={"/profile"}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "white" : "",
            color: isActive ? "black" : "",
          })}
          onClick={() => setMobileVeiw(false)}
          className="text-white text-center p-2 text-lg hover:bg-white hover:text-black w-full duration-500"
        >
          My profile
        </NavLink>
        <NavLink
          to="/myVideos"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "white" : "",
            color: isActive ? "black" : "",
          })}
          onClick={() => setMobileVeiw(false)}
          className="text-white text-center p-2 text-lg hover:bg-white hover:text-black w-full duration-500"
        >
          My videos
        </NavLink>
        <NavLink
          to="/goLive"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "white" : "",
            color: isActive ? "black" : "",
          })}
          onClick={() => setMobileVeiw(false)}
          className="text-white text-center p-2 text-lg hover:bg-white hover:text-black w-full duration-500"
        >
          Go live
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
            textUnderlineOffset: isActive ? "8px" : "none",
            border: isActive ? "none" : "",
          })}
          onClick={() => setMobileVeiw(false)}
          to="/liveStreams"
          className="text-white text-center p-2 text-lg hover:bg-white hover:text-black w-full duration-500"
        >
          Watch Streams
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
            textUnderlineOffset: isActive ? "8px" : "none",
            border: isActive ? "none" : "",
          })}
          onClick={() => setMobileVeiw(false)}
          to="/categories"
          className="text-white text-center p-2 text-lg hover:bg-white hover:text-black w-full duration-500"
        >
          Category
        </NavLink>
        <div
          onClick={logout}
          className="text-red-500 text-center p-2 text-lg hover:bg-red-500 hover:text-black w-full duration-500"
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default Nav;
