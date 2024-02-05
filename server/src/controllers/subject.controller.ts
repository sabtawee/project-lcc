import { subjectService } from "../services";

const handleGetSubject = async () => {
  try {
    const response = await subjectService.getSubjects();
    return {
      statusCode: 200,
      msg: "get all subject",
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

const handleGetSubjectById = async (request: any, reply: any) => {
  try {
    const { id } = request.params;
    const response = await subjectService.getSubjectById(id);
    if (response) {
      return {
        statusCode: 200,
        msg: "get subject by id",
        response,
      };
    } else {
      return {
        statusCode: 404,
        msg: "Subject not found",
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

const handleCreateSubject = async (request: any, reply: any) => {
  try {
    const { body } = request;
    const response = await subjectService.createSubject(body);

    if (!response) {
      return {
        statusCode: 400,
        msg: "subject already exists",
        response,
      };
    }
    return {
      statusCode: 200,
      msg: "subject created",
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

const handleUpdateSubject = async (request: any, reply: any) => {
  try {
    const { id } = request.params;
    const { body } = request;
    const response = await subjectService.updateSubject(id, body);
    if (response) {
      return {
        statusCode: 200,
        msg: "subject updated",
        response,
      };
    } else {
      return {
        statusCode: 404,
        msg: "Subject not found",
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

const handleDeleteSubject = async (request: any, reply: any) => {
  try {
    const { id } = request.params;
    const response = await subjectService.deleteSubject(id);
    if (response) {
      return {
        statusCode: 200,
        msg: "subject deleted",
        response,
      };
    } else {
      return {
        statusCode: 404,
        msg: "Subject not found",
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
  handleGetSubject,
  handleGetSubjectById,
  handleCreateSubject,
  handleUpdateSubject,
  handleDeleteSubject,
};
