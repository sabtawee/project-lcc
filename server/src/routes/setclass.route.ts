import { setclassController } from "../controllers";
import { FastifyInstance } from "fastify";

const setclassRouter = async (app: FastifyInstance) => {
  app.get("/", setclassController.handleGetSetClass);
  app.get("/:id", setclassController.handleGetSetClassById);
  app.post("/", setclassController.handleCreateSetClass);
  app.delete("/:id", setclassController.handleDeleteSetClass);
};
export default setclassRouter;