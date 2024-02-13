import { gradeController } from "../controllers";
import { FastifyInstance } from "fastify";

const gradeRouter = async (app: FastifyInstance) => {
  app.get("/:student_id", gradeController.handlegetGradeBtStudentId);
  app.get("/class/:teacher_id", gradeController.getClassTeacher);
  app.post("/insert/update", gradeController.handleGetInsertGrade);
  app.post("/update/grade", gradeController.handleUpdateGrade);
};

export default gradeRouter;