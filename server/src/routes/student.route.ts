import { studentController } from "../controllers";
import { FastifyInstance } from "fastify";

const studentRouter = async (app: FastifyInstance) => {
  app.get("/", studentController.handleGetStudent);
  app.get("/:id", studentController.handleGetStudentById);
  app.post("/", studentController.handleCreateStudent);
  app.post("/login", studentController.handleLoginStudent);
  app.get("/auth", studentController.handleGetStudentBytoken);
  app.delete("/:id", studentController.handleDeleteStudent);
};

export default studentRouter;