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
};

const getSetclass = async () => {
  try {
    const setclass = await prisma.setclass.findMany();
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
        const { block_id, subject_id, subject_name, teacher_id, teacher_name, model_id } = data;
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
        const newSetclass = await prisma.setclass.create({
            data: {
                block_id,
                subject_id,
                subject_name,
                teacher_id,
                teacher_name,
                model_id,
            },
        });
        return newSetclass;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateSetclass = async (id: Setclass, data: Setclass) => {
    try {
        const { block_id, subject_id, subject_name, teacher_id, teacher_name, model_id } = data;
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