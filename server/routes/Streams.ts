import { Router } from "express";
import goLive from "../controllers/Streams/goLive";
import {
  getChannelStreamStatus,
  liveStreams,
  createStream,
} from "../controllers/Streams/LiveStreams";
import { video } from "../controllers/Streams/Videos";
import { verifyAuth } from "../middleware/authVerify";

const StreamsRoutes = Router();

StreamsRoutes.post("/stream", verifyAuth, goLive);
StreamsRoutes.post("/liveStreams", verifyAuth, liveStreams);
StreamsRoutes.post("/createStream", verifyAuth, createStream);
StreamsRoutes.get(
  "/getChannelStreamStatus",
  verifyAuth,
  getChannelStreamStatus
);

StreamsRoutes.post("/video", verifyAuth, video);

export default StreamsRoutes;
