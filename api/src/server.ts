import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Path from "path";
import restaurantsRouter from "./routes/restaurants.routes";
import usersRouter from "./routes/users.routes";
import reservationsRouter from "./routes/reservations.routes";
import reviewRouter from "./routes/reviews.routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  "/src/imgsRestaurants",
  express.static(Path.join("src/imgsRestaurants"))
);

mongoose.connect("mongodb://localhost:27017/foodie-db");
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("Konekcija sa bazom je uspesna");
});

const router = express.Router();
router.use("/restaurants", restaurantsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewRouter);
router.use("/users", usersRouter);

app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
