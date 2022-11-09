import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address: { type: String, required: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  playbackUrl: { type: String, required: true },
  channelArn: { type: String, required: true },
  ingestEndpoint: { type: String, required: true },
  profilePicture: { type: String, required: true },
  streamKey: { type: String, required: true },
});

export default mongoose.model("user", userSchema);
