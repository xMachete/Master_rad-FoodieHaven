import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Wrong email format."),
  password: z.string().min(3),
});

export const createRestaurantSchema = z.object({
  name: z.string().min(3),
  category: z.string().min(3),
  hours: z.string().refine((data) => data.split(",").length > 5, {
    message: "Must have all 7 working hours",
  }),
  location: z.string(),
  // photos: z.string(),
  coordinates: z.string(),
  display_phone: z.string(),
  price: z.string(),
  rating: z.string(),
  // review_count: z.string(),
});

export const createReservationSchema = z.object({
  restaurantId: z.string(),
  tableNumber: z.string(),
  email: z.string().email("Wrong email format."),
  date: z.string(),
  time: z.string(),
});

export const editReservationSchema = z.object({
  restaurantId: z.string(),
  name: z.string(),
  tableNumber: z.string(),
  email: z.string().email("Wrong email format."),
  date: z.string(),
  time: z.string(),
  confirmed: z.boolean(),
});

export const editUserSchema = z.object({
  email: z.string().email("Wrong email format."),
  password: z.string().min(3),
});
