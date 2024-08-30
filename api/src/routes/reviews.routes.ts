import express from "express";
import Review from "../models/review";

const reviewRouter = express.Router();

reviewRouter.post("/create", async (req, res) => {
  try {
    const review = await Review.create(req.body);

    if (!review) {
      return res.status(500).json({ message: "Error creating review" });
    }
    // TODO: Update message to be more descriptive
    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

reviewRouter.get("/getAll", async (req, res) => {
  try {
    const reviews = await Review.find({});

    if (!reviews) {
      return res.status(500).json({ message: "Error fetching reviews" });
    }

    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

reviewRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

reviewRouter.get("/:restaurantId", async (req, res) => {
  try {
    const reviews = await Review.find({
      restaurantId: req.params.restaurantId,
    });

    if (!reviews) {
      return res.status(500).json({ message: "Error fetching reviews" });
    }

    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default reviewRouter;
