import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  restaurantId: { type: String },
  name: { type: String },
  tableNumber: { type: String },
  email: { type: String },
  date: { type: String },
  time: { type: String },
  confirmed: { type: Boolean, default: false },
  confirmationToken: { type: String },
});

export default mongoose.model("Reservation", reservationSchema, "reservations");
