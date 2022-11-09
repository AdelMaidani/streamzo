import mongoose from "mongoose";

const streamsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingestEndpoint: {
    type: String,
    required: true,
  },
  streamKey: {
    type: String,
    required: true,
  },
  streamId: {
    type: String,
    required: true,
  },
  playbackUrl: {
    type: String,
    require: true,
  },
});

export default mongoose.model("streams", streamsSchema);
