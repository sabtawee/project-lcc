import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Subject = {
  id: number;
  subject_id: string;
  subject_name: string;
};

const getSubjects = async () => {
  try {
    const subjects = await prisma.subjects.findMany();
    return subjects;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getSubjectById = async (id: Subject) => {
  try {
    const subject = await prisma.subjects.findUnique({
      where: {
        id: Number(id),
      },
    });
    return subject;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createSubject = async (data: Subject) => {
  try {
    const { subject_id, subject_name } = data;
    const subjects = await prisma.subjects.findMany({
      where: {
        subject_id: subject_id,
      },
    });
    if (subjects.length > 0) {
      return null;
    }
    const subject = await prisma.subjects.create({
      data: {
        subject_id,
        subject_name,
      },
    });
    return subject;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateSubject = async (id: Subject, data: Subject) => {
  try {
    const { subject_id, subject_name } = data;
    const subject = await prisma.subjects.update({
      where: {
        id: Number(id),
      },
      data: {
        subject_id,
        subject_name,
      },
    });
    return subject;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteSubject = async (id: Subject) => {
  try {
    const subject = await prisma.subjects.delete({
      where: {
        id: Number(id),
      },
    });
    return subject;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
