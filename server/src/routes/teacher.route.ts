import { teacherController } from "../controllers";
import { FastifyInstance } from "fastify";

const teacherRouter = async (app: FastifyInstance) => {
  app.get("/", teacherController.handleGetTeacher);
  app.get("/:id", teacherController.handleGetTeacherById);
  app.post("/", teacherController.handleCreateTeacher);
  app.post("/login", teacherController.handleLoginTeacher);
  app.get("/auth", teacherController.handleGetTeacherBytoken);
};

export default teacherRouter;
