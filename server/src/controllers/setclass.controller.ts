import { setclassService } from "../services";

const handleGetSetClass = async () => {
  try {
    const response = await setclassService.getSetclass();
    return {
      statusCode: 200,
      msg: "get all setclass",
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

const handleGetSetClassById = async (request: any, reply: any) => {
  try {
    const { id } = request.params;
    const response = await setclassService.getSetclassById(id);
    if (response) {
      return {
        statusCode: 200,
        msg: "get setclass by id",
        response,
      };
    } else {
      return {
        statusCode: 404,
        msg: "Setclass not found",
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

const handleCreateSetClass = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await setclassService.createSetclass(body);

    if (!response) {
      return {
        statusCode: 400,
        msg: "setclass already exists",
        response,
      };
    }
    return {
      statusCode: 201,
      msg: "setclass created",
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

const handleUpdateSetClass = async (request: any, reply: any) => {
  try {
    const { id } = request.params;
    const { body } = request;
    const response = await setclassService.updateSetclass(id, body);
    if (!response) {
      return {
        statusCode: 404,
        msg: "Setclass not found",
        response: null,
      };
    }
    return {
      statusCode: 200,
      msg: "setclass updated",
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

const handleDeleteSetClass = async (request: any, reply: any) => {
  try {
    const { id } = request.params;
    const response = await setclassService.deleteSetclass(id);
    if (!response) {
      return {
        statusCode: 404,
        msg: "Setclass not found",
        response: null,
      };
    }
    return {
      statusCode: 200,
      msg: "setclass deleted",
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

export default {
  handleGetSetClass,
  handleGetSetClassById,
  handleCreateSetClass,
  handleUpdateSetClass,
  handleDeleteSetClass,
};
