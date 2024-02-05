import { teacherController } from "../controllers";
import { FastifyInstance } from "fastify";

const teacherRouter = async (app: FastifyInstance) => {
  app.get("/", teacherController.handleGetTeacher);
  app.get("/:id", teacherController.handleGetTeacherById);
  app.post("/", teacherController.handleCreateTeacher);
  app.post("/login", teacherController.handleLoginTeacher);
  app.get("/auth", teacherController.handleGetTeacherBytoken);
  app.delete("/:id", teacherController.handleDeleteTeacher);
  app.put("/:id", teacherController.handleUpdateTeacher);
};

export default teacherRouter;