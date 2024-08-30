import express from "express";
import User from "../models/user";

const usersRouter = express.Router();

usersRouter.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: password }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      if (user == null) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        res.status(200).json({ message: "OK", userId: user._id });
      }
    }
  });
});

usersRouter.put("/update/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedUser) {
      res.status(404).json({ message: "Not found", statusCode: 404 });
    }
    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default usersRouter;
