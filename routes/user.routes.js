import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
// userRouter.use(authorize);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => res.send({ message: "CREATE user" }));

userRouter.put("/:id", (req, res) =>
  res.send({ message: "UPDATE user details" })
);

userRouter.delete("/:id", (req, res) =>
  res.send({ message: "DELETE user details" })
);

export default userRouter;
