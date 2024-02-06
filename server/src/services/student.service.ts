import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

type Student = {
  id: number;
  student_id: string;
  firstname: string;
  lastname: string;
  password: string;
  branch: string;
  model_id: string;
};

const getStudents = async () => {
  try {
    const students = await prisma.students.findMany();
    return students;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getStudentById = async (id: Student) => {
  try {
    const student = await prisma.students.findUnique({
      where: {
        id: Number(id),
      },
    });
    return student;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createStudent = async (data: Student) => {
  try {
    const { student_id, firstname, lastname, password, branch, model_id } = data;
    const student = await prisma.students.findMany({
      where: {
        student_id: student_id,
      },
    });
    if (student.length > 0) {
      return null;
    } 

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newStudent = await prisma.students.create({
      data: {
        student_id,
        firstname,
        lastname,
        password: hash,
        branch,
        model_id
      },
    });
    return newStudent;

  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateStudent = async (id: Student, data: Student) => {
  try {
    const { student_id, firstname, lastname, password, branch } = data;
    const student = await prisma.students.update({
      where: {
        id: Number(id),
      },
      data: {
        student_id,
        firstname,
        lastname,
        password,
        branch,
      },
    });
    return student;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteStudent = async (id: Student) => {
  try {
    const student = await prisma.students.delete({
      where: {
        id: Number(id),
      },
    });
    return student;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const LoginStudent = async (data: Student) => {
  try {
    const { student_id, password } = data;
    const student = await prisma.students.findUnique({
      where: {
        student_id: student_id,
      },
    });
    if (!student) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return null;
    }
    const payload = {
      student: {
        id: student.id,
      },
    };
    const token = jwt.sign(payload, "randomString", {
      expiresIn: 3600,
    });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, "randomString");
    const student = await prisma.students.findUnique({
      where: {
        id: Number(decoded),
      },
    });
    if (student) {
      return student;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  LoginStudent,
  verifyToken,
};
