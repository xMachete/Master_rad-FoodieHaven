import express, { response, text } from "express";
import Reservation from "../models/reservation";
import nodemailer from "nodemailer";
import crypto from "crypto";
import reservation from "../models/reservation";
import "dotenv/config";

const reservationsRouter = express.Router();

const sendEmail = ({ to, subject, html }) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "s.slobodan.x25@gmail.com",
        pass: process.env.AUTH_MAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "s.slobodan.x25@gmail.com",
      to,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        reject({ message: "Error sending email!" });
      } else {
        resolve({ message: "Emails sent successfully!" });
      }
    });
  });
};

reservationsRouter.post("/create", async (req, res) => {
  try {
    const confirmationToken = crypto.randomBytes(32).toString("hex");
    const reservationData = { ...req.body, confirmationToken };
    const reservation = await Reservation.create(reservationData);

    const confirmationLink = `http://localhost:4000/reservations/confirm/${confirmationToken}`;

    sendEmail({
      to: req.body.email,
      subject: "Confirm your reservation",
      html: `<a href="${confirmationLink}">Click here to confirm your reservation</a>`,
    })
      .then((response) =>
        res.status(200).json({ message: "OK", statusCode: 201 })
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Confirmation route
reservationsRouter.get("/confirm/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const reservation = await Reservation.findOne({ confirmationToken: token });

    if (!reservation) {
      return res.status(400).json({ message: "Invalid confirmation token" });
    }

    reservation.confirmed = true;
    reservation.confirmationToken = undefined; // Remove the token after confirmation

    await reservation.save();

    res.status(200).json({ message: "Reservation confirmed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

reservationsRouter.get("/getAll", (req, res) => {
  try {
    Reservation.find({}, function (err, result) {
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

reservationsRouter.put("/update/:id", async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!updatedReservation) {
      res.status(404).json({ message: "Not found", statusCode: 404 });
    }

    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

reservationsRouter.get("/:id", (req, res) => {
  Reservation.findById(req.params.id)
    .then((result) => {
      res.status(200).json({ message: "OK", payload: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

reservationsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    );

    if (!deletedReservation) {
      res.status(404).json({ message: "Not found" });
    }

    Reservation.find({}, function (err, result) {
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

export default reservationsRouter;
