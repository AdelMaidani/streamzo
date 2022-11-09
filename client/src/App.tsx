import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Categories from "./page/Categories";
import Home from "./page/Home";
import LiveStreams from "./page/LiveStreams";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import LiveStreamingPage from "./page/LiveStreamingPage";
import Videos from "./page/Videos";
import CategoryDetails from "./page/CategoryDetails";
import VideoPage from "./page/VideoPage";
import MyVideos from "./page/MyVideos";
import Profile from "./page/Profile";
import { PrivateRoute } from "./utils/PrivateRoutes";
import { UserProvider } from "./utils/UserContext";
import GoLive from "./page/GoLive";

function App() {
  return (
    <div className="App text-xs">
      <UserProvider>
        <Nav />
        <div className="bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/liveStreams" element={<LiveStreams />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/:categoryName" element={<CategoryDetails />} />
            <Route path="/video" element={<VideoPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Profile />} path="/profile" />
              <Route
                path="/LiveStreamingPage"
                element={<LiveStreamingPage />}
              />
              <Route path="/myVideos" element={<MyVideos />} />
              <Route path="/goLive" element={<GoLive />} />
            </Route>
          </Routes>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
