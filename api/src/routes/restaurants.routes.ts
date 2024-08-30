import express from "express";
import multer from "multer";
import Restaurant from "../models/restaurant";

const restaurantsRouter = express.Router();

const storageRestaurants = multer.diskStorage({
  destination: (req: any, file: any, callBack: any) => {
    callBack(null, "src/imgsRestaurants");
  },
  filename: (req: any, file: any, callBack: any) => {
    callBack(null, `restaurant_${Date.now()}_${file.originalname}`);
  },
});

restaurantsRouter.post(
  "/create",
  multer({ storage: storageRestaurants }).array("photos"),
  (req, res, next) => {
    // TODO: check if request is valid and contains files
    const files = req.files;
    const url = req.protocol + "://" + req.get("host");

    let restaurant = new Restaurant(req.body);
    restaurant.photos = [];
    for (let f of files) {
      const image = url + "/src/imgsRestaurants/" + f.filename;
      restaurant.photos.push(image);
    }
    restaurant.image_url = restaurant.photos[0];
    restaurant.coordinates = JSON.parse(restaurant.coordinates);
    restaurant
      .save()
      .then((r1) => {
        res.status(200).json({
          message: "OK",
          statusCode: 201,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

restaurantsRouter.get("/getAll", (req, res) => {
  try {
    Restaurant.find({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

restaurantsRouter.get("/:id", (req, res) => {
  Restaurant.findById(req.params.id)
    .then((result) => {
      res.status(200).json({ message: "OK", payload: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

restaurantsRouter.put(
  "/edit/:id",
  multer({ storage: storageRestaurants }).array("newPhotos"),
  (req, res) => {
    // TODO delete removed images from FSF
    let photos = JSON.parse(req.body.photos);
    const files = req.files;
    const url = req.protocol + "://" + req.get("host");

    if (files) {
      for (let f of files) {
        const image = url + "/src/imgsRestaurants/" + f.filename;
        photos.push(image);
      }
    }

    // TODO figure out if all fields should be updated like this
    // problematic - "review_count" field gets created with null,
    // because it isn't sent from FE
    Restaurant.updateOne(
      { _id: req.params["id"] },
      {
        $set: {
          category: req.body.category,
          coordinates: JSON.parse(req.body.coordinates),
          display_phone: req.body.display_phone,
          hours: req.body.hours,
          location: req.body.location,
          name: req.body.name,
          price: req.body.price,
          rating: req.body.rating,
          review_count: req.body.review_count,
          photos: photos,
          image_url: photos[0],
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          message: "OK",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }
);

restaurantsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      res.status(404).json({ message: "Not found" });
    }

    Restaurant.find({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default restaurantsRouter;
