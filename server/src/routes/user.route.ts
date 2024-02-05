import { userController } from "../controllers";
import { FastifyInstance } from "fastify";

const userRouter = async (app: FastifyInstance) => {
  app.get("/", userController.handleGetUser);
  app.get("/:id", userController.handleGetUserById);
  app.post("/", userController.handleCreateUser);
  app.post("/login", userController.handleLoginUser);
  app.get("/auth", userController.handleGetUserByToken);
};

export default userRouter;
