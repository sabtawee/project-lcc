import { userService } from "../services";

const handleGetUser = async () => {
  const response = await userService.getUsers();
  return {
    statusCode: 200,
    msg: "get all user",
    response,
  };
};

const handleGetUserById = async (request: any, reply: any) => {
  const { id } = request.params;
  const response = await userService.getUserById(id);
  return {
    statusCode: 200,
    msg: "get user by id",
    response,
  };
};

const handleCreateUser = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await userService.createUser(body);

    if (!response) {
      return {
        statusCode: 400,
        msg: "user already exists",
        response,
      };
    }

    return {
      statusCode: 200,
      msg: "create user",
      response,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      msg: "Internal Server Error",
      response: null,
    };
  }
};

const handleLoginUser = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await userService.LoginUser(body);

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
    console.error(error);
    return {
      statusCode: 500,
      msg: "Internal Server Error",
      response: null,
    };
  }
};

const handleGetUserByToken = async (request: any, reply: any) => {
  try {
    // check authorization header
    const { authorization } = request.headers;
    if (!authorization) {
      return {
        statusCode: 401,
        msg: "Unauthorized",
        response: null,
      };
    }
    // check token
    const token = authorization.split(" ")[1];
    const response = await userService.verifyToken(token);
    if (response) {
      return {
        statusCode: 200,
        msg: "Get user by token",
        response,
      };
    } else {
      return {
        statusCode: 401,
        msg: "Unauthorized",
        response: null,
      };
    }
  } catch (error) {}
};

export default {
  handleGetUser,
  handleGetUserById,
  handleCreateUser,
  handleLoginUser,
  handleGetUserByToken,
};
