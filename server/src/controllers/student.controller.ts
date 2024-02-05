import { studentService } from "../services";

const handleGetStudent = async () => {
  try {
    const response = await studentService.getStudents();
    return {
      statusCode: 200,
      msg: "get all student",
      response,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      msg: "Internal server error.",
      response: null,
    };
  }
};

const handleGetStudentById = async (request: any, reply: any) => {
  try {
    const { id } = request.params;
    const response = await studentService.getStudentById(id);
    if (response) {
      return {
        statusCode: 200,
        msg: "get student by id",
        response,
      };
    } else {
      return {
        statusCode: 404,
        msg: "Student not found",
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

const handleCreateStudent = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await studentService.createStudent(body);

    console.log(response);
    if (!response) {
      return {
        statusCode: 400,
        msg: "student already exists",
        response,
      };
    }
    return {
      statusCode: 200,
      msg: "create student",
      response,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      msg: "Internal server error.",
      response: null,
    };
  }
};

const handleLoginStudent = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await studentService.LoginStudent(body);
    if (response) {
      return {
        statusCode: 200,
        msg: "Login successful",
        response: { token: response },
      };
    } else {
      console.log("Login failed. Invalid credentials.");
      return {
        statusCode: 401,
        msg: "Login failed. Invalid credentials.",
        response: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      msg: "Login failed. Internal server error.",
      response: null,
    };
  }
};

const handleGetStudentBytoken = async (request: any, reply: any) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      return {
        statusCode: 401,
        msg: "Unauthorized",
        response: null,
      };
    }
    const token = authorization.split(" ")[1];
    const response = await studentService.verifyToken(token);
    if (response) {
      return {
        statusCode: 200,
        msg: "Get student by token",
        response,
      };
    } else {
      return {
        statusCode: 401,
        msg: "Unauthorized",
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

const handleDeleteStudent = async (request: any, reply: any) => {
  try {
    const { id } = request.params;
    const response = await studentService.deleteStudent(id);
    if (response) {
      return {
        statusCode: 200,
        msg: "delete student",
        response,
      };
    } else {
      return {
        statusCode: 404,
        msg: "Student not found",
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

export default {
  handleGetStudent,
  handleGetStudentById,
  handleCreateStudent,
  handleLoginStudent,
  handleGetStudentBytoken,
  handleDeleteStudent,
};
