import { subjectController } from "../controllers";
import { FastifyInstance } from "fastify";

const subjectRouter = async (app: FastifyInstance) => {
  app.get("/", subjectController.handleGetSubject);
  app.get("/:id", subjectController.handleGetSubjectById);
  app.post("/", subjectController.handleCreateSubject);
  app.put("/:id", subjectController.handleUpdateSubject);
  app.delete("/:id", subjectController.handleDeleteSubject);
};

export default subjectRouter;