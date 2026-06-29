import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: String,
  location: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

export default mongoose.model("Branch", branchSchema);