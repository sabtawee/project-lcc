import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Setclass = {
  id: number;
  block_id: string;
  subject_id: string;
  subject_name: string;
  teacher_id: string;
  teacher_name: string;
  model_id: string;
  branch: string;
  grade: string;
};

const getSetclass = async () => {
  try {
    const setclass = await prisma.setclass.findMany();
    const teacher = await prisma.teachers.findMany();
    const subject = await prisma.subjects.findMany();
    for (let i = 0; i < setclass.length; i++) {
      for (let j = 0; j < teacher.length; j++) {
        if (setclass[i].teacher_id === teacher[j].teacher_id) {
          setclass[i].teacher_name = teacher[j].firstname + " " + teacher[j].lastname;
        }
      }
      for (let k = 0; k < subject.length; k++) {
        if (setclass[i].subject_id === subject[k].subject_id) {
          setclass[i].subject_name = subject[k].subject_name;
        }
      }
    }
    return setclass;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getSetclassById = async (id: Setclass) => {
  try {
    const setclass = await prisma.setclass.findUnique({
      where: {
        id: Number(id),
      },
    });
    return setclass;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createSetclass = async (data: Setclass) => {
  try {
    const { block_id, subject_id, teacher_id, model_id, branch } = data;
    const setclass = await prisma.setclass.findMany({
      where: {
        block_id: block_id,
        subject_id: subject_id,
        teacher_id: teacher_id,
      },
    });
    if (setclass.length > 0) {
      return null;
    }
    const getBranch = await prisma.students.findMany({
        where: {
            branch: branch,
            model_id: model_id,
        },
    });
    for (let i = 0; i < getBranch.length; i++) {
        const setgrade = await prisma.grades.create({
            data: {
                student_id: getBranch[i].student_id,
                block_id: block_id,
                subject_id: subject_id,
                teacher_id: teacher_id,
                grade: "0",
            },
        });
    }
    const newSetclass = await prisma.setclass.create({
      data: {
        block_id,
        subject_id,
        subject_name: "subject_name",
        teacher_id,
        teacher_name: "teacher_name",
        model_id,
      },
    });
    return "Create setclass success";
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateSetclass = async (id: Setclass, data: Setclass) => {
  try {
    const {
      block_id,
      subject_id,
      subject_name,
      teacher_id,
      teacher_name,
      model_id,
    } = data;
    const setclass = await prisma.setclass.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!setclass) {
      return null;
    }
    const updatedSetclass = await prisma.setclass.update({
      where: {
        id: Number(id),
      },
      data: {
        block_id,
        subject_id,
        subject_name,
        teacher_id,
        teacher_name,
        model_id,
      },
    });
    return updatedSetclass;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteSetclass = async (id: Setclass) => {
  try {
    const deletedSetclass = await prisma.setclass.delete({
      where: {
        id: Number(id),
      },
    });
    return deletedSetclass;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getSetclass,
  getSetclassById,
  createSetclass,
  updateSetclass,
  deleteSetclass,
};
