import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ message: "GET all subscriptions" })
);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ message: "GET subscription details" })
);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ message: "UPDATE subscription" })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ message: "DELETE subscription" })
);

subscriptionRouter.get("/users/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ message: "CANCEL all user subscriptions" })
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ message: "GET upcoming subscription" })
);

export default subscriptionRouter;
