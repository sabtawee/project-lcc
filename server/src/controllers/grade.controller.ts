import { gradeService } from "../services";

const handlegetGradeBtStudentId = async (request: any, reply: any) => {
  try {
    const { student_id } = request.params;
    const response = await gradeService.getGradesById(student_id);
    if (response) {
      return {
        statusCode: 200,
        msg: "get grade by student id",
        response,
      };
    } else {
      return {
        statusCode: 404,
        msg: "grade not found",
        response: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      msg: "Internal server error.",
      response: null,
    };
  }
};

const getClassTeacher = async (request: any, reply: any) => {
  try {
    const { teacher_id } = request.params;
    const response = await gradeService.getClassTeacher(teacher_id);
    if (response) {
      return {
        statusCode: 200,
        msg: "get class by teacher id",
        response,
      };
    } else {
      return {
        statusCode: 404,
        msg: "class not found",
        response: null,
      };
    }
    
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      msg: "Internal server error.",
      response: null,
    };
    
  }
};

const handleGetInsertGrade = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await gradeService.getGradesByTeacher(body);
    return {
      statusCode: 200,
      msg: "insert grade",
      response,
    };

  } catch (error) {
    console.log(error);
  }
};

const handleUpdateGrade = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await gradeService.updateGrade(body);
    return {
      statusCode: 200,
      msg: "update grade",
      response,
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  handlegetGradeBtStudentId,
  getClassTeacher,
  handleGetInsertGrade,
  handleUpdateGrade,
};
