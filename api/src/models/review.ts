import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  restaurantId: { type: String },
  name: { type: String },
  stars: { type: String },
  comment: { type: String },
});

export default mongoose.model("Review", reviewSchema, "reviews");
