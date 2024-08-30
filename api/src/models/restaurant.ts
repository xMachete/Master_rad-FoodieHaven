import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Restaurant = new Schema({
  category: { type: String },
  coordinates: { type: Object },
  display_phone: { type: String },
  hours: { type: String },
  image_url: { type: String },
  location: { type: String },
  name: { type: String },
  photos: { type: Array },
  price: { type: String },
  rating: { type: Number },
  review_count: { type: Number, default: 0 },
});

export default mongoose.model("Restaurant", Restaurant, "restaurants");
