import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

type Teacher = {
  id: number;
  teacher_id: string;
  firstname: string;
  lastname: string;
  password: string;
};

const getTeachers = async () => {
  try {
    const teachers = await prisma.teachers.findMany();
    return teachers;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getTeacherById = async (id: Teacher) => {
  try {
    const teacher = await prisma.teachers.findUnique({
      where: {
        id: Number(id),
      },
    });
    return teacher;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createTeacher = async (data: Teacher) => {
  try {
    const { teacher_id, firstname, lastname, password } = data;
    const teacher = await prisma.teachers.findMany({
      where: {
        teacher_id: teacher_id,
      },
    });

    if (teacher.length > 0) {
      return null;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newTeacher = await prisma.teachers.create({
      data: {
        teacher_id,
        firstname,
        lastname,
        password: hash,
      },
    });
    return newTeacher;
    
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTeacher = async (id: Teacher, data: Teacher) => {
  try {
    const { teacher_id, firstname, lastname, password } = data;
    const teacher = await prisma.teachers.update({
      where: {
        id: Number(id),
      },
      data: {
        teacher_id,
        firstname,
        lastname,
        password,
      },
    });
    return teacher;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteTeacher = async (id: Teacher) => {
  try {
    const teacher = await prisma.teachers.delete({
      where: {
        id: Number(id),
      },
    });
    return teacher;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const LoginTeacher = async (data: Teacher) => {
  try {
    const { teacher_id, password } = data;
    const teacher = await prisma.teachers.findUnique({
      where: {
        teacher_id: teacher_id,
      },
    });
    if (teacher) {
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (isMatch) {
        const payload = {
          teacher: {
            id: teacher.id,
          },
        };
        const token = jwt.sign(payload, "secret", {
          expiresIn: "24h",
        });
        return token;
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, "secret");
    const teacher = await prisma.teachers.findUnique({
      where: {
        id: Number(decoded),
      },
    });

    if (teacher) {
      return teacher;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getTeachers,
  getTeacherById,
  createTeacher,
  LoginTeacher,
  verifyToken,
  updateTeacher,
  deleteTeacher,
};
