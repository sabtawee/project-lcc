import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = "secret";

type User = {
  id: number;
  user_id: string;
  firstname: string;
  lastname: string;
  password: string;
};

const getUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};
// request.params.id is a number
const getUserById = async (id: User) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createUser = async (data: User) => {
  try {
    const { user_id, firstname, lastname, password } = data;
    const user = await prisma.users.findMany({
      where: {
        user_id: user_id,
      },
    });

    if (user.length > 0) {
      return null;
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = await prisma.users.create({
        data: {
          user_id,
          firstname,
          lastname,
          password: hash,
        },
      });
      return newUser;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const LoginUser = async (data: User): Promise<string | null> => {
  try {
    const { user_id, password } = data;
    const user = await prisma.users.findMany({
      where: {
        user_id: user_id,
      },
    });

    if (user && user.length > 0) {
      const isMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user[0].password, (err: any, result: any) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (isMatch) {
        const token = jwt.sign(
          {
            id: user[0].id,
            user_id: user[0].user_id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
          },
          JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        return token;
      } else {
        console.log("password not match");
        return null;
      }
    } else {
      console.log("user not found");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  LoginUser,
  verifyToken,
};
