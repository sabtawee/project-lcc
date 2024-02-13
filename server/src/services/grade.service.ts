import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getGradesById = async (student_id: any) => {
  try {
    const grades = await prisma.grades.findMany({
      where: {
        student_id: student_id,
      },
    });
    let data = [];

    for (let i = 0; i < grades.length; i++) {
      const subject = await prisma.subjects.findMany({
        where: {
          subject_id: grades[i].subject_id,
        },
      });

      const teacher = await prisma.teachers.findMany({
        where: {
          teacher_id: grades[i].teacher_id,
        },
      });

      let detailblock = {
        subject_id: subject[0].subject_id,
        subject_name: subject[0].subject_name,
        teacher_name: teacher[0].firstname,
        grade: grades[i].grade,
      };
      const existingBlockIndex = data.findIndex(
        (item) => item.block_id === grades[i].block_id
      );
      if (existingBlockIndex !== -1) {
        data[existingBlockIndex].block_detail.push(detailblock);
      } else {
        data.push({
          block_id: grades[i].block_id,
          block_detail: [detailblock],
        });
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getClassTeacher = async (teacher_id: any) => {
  try {
    const class_teacher = await prisma.grades.findMany({
      where: {
        teacher_id: teacher_id,
      },
    });

    //remove duplicate subject

    let data = [];

    for (let i = 0; i < class_teacher.length; i++) {
      const subject = await prisma.subjects.findMany({
        where: {
          subject_id: class_teacher[i].subject_id,
        },
      });

      data.push({
        subject_id: subject[0].subject_id,
        subject_name: subject[0].subject_name,
      });
    }

    //remove duplicate subject
    data = data.filter(
      (v, i, a) => a.findIndex((t) => t.subject_id === v.subject_id) === i
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getGradesByTeacher = async (body: any) => {
  try {
    const { teacher_id } = body;
    const grades = await prisma.grades.findMany({
      where: {
        teacher_id: teacher_id,
      },
    });
    let data = [];

    for (let i = 0; i < grades.length; i++) {
      const subject = await prisma.subjects.findMany({
        where: {
          subject_id: grades[i].subject_id,
        },
      });

      const student = await prisma.students.findMany({
        where: {
          student_id: grades[i].student_id,
        },
      });

      let detailblock = {
        id: grades[i].id,
        subject_id: subject[0].subject_id,
        subject_name: subject[0].subject_name,
        student_id: student[0].student_id,
        student_name: student[0].firstname,
        student_lastname: student[0].lastname,
        student_branch: student[0].branch,
        student_model: student[0].model_id,
        grade: grades[i].grade,
      };
      const existingBlockIndex = data.findIndex(
        (item) => item.block_id === grades[i].block_id
      );
      if (existingBlockIndex !== -1) {
        data[existingBlockIndex].block_detail.push(detailblock);
      } else {
        data.push({
          block_id: grades[i].block_id,
          block_detail: [detailblock],
        });
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateGrade = async (body: any) => {
  try {
    const { id, score } = body;

    let grade = 0;
    if (score >= 80) {
      grade = 4;
    } else if (score >= 75) {
      grade = 3.5;
    } else if (score >= 70) {
      grade = 3;
    } else if (score >= 65) {
      grade = 2.5;
    } else if (score >= 60) {
      grade = 2;
    } else if (score >= 55) {
      grade = 1.5;
    } else if (score >= 50) {
      grade = 1;
    } else {
      grade = 0;
    }

    const updateGrade = await prisma.grades.update({
      where: {
        id: id,
      },
      data: {
        grade: String(grade),
      },
    });
    return updateGrade;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getGradesById,
  getClassTeacher,
  getGradesByTeacher,
  updateGrade,
};
