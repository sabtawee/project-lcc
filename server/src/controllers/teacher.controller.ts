import { teacherService } from "../services";

const handleGetTeacher = async () => {
  const response = await teacherService.getTeachers();
  return {
    statusCode: 200,
    msg: "get all teacher",
    response,
  };
};

const handleGetTeacherById = async (request: any, reply: any) => {
  const { id } = request.params;
  const response = await teacherService.getTeacherById(id);
  return {
    statusCode: 200,
    msg: "get teacher by id",
    response,
  };
};

const handleCreateTeacher = async (request: any, reply: any) => {
  const { body } = request;
  const response = await teacherService.createTeacher(body);

  if (!response) {
    return {
      statusCode: 400,
      msg: "teacher already exists",
      response,
    };
  }

  return {
    statusCode: 200,
    msg: "create teacher",
    response,
  };
};

const handleLoginTeacher = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await teacherService.LoginTeacher(body);

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

const handleGetTeacherBytoken = async (request: any, reply: any) => {
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
    const response = await teacherService.verifyToken(token);

    if (!response) {
      return {
        statusCode: 401,
        msg: "Unauthorized",
        response: null,
      };
    }
    return {
      statusCode: 200,
      msg: "get teacher by token",
      response,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      msg: "Login failed. Internal server error.",
      response: null,
    };
  }
};

export default {
  handleGetTeacher,
  handleGetTeacherById,
  handleCreateTeacher,
  handleLoginTeacher,
  handleGetTeacherBytoken,
};
