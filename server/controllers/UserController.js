import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../prisma/prisma.js";


// Регистрация пользователя
export const register = async (req, res) => {
  try {
    const { email, password, login } = req.body;

    // Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hash,
        login,
      },
    });

    // Создание токена
    const token = jwt.sign(
      {
        _id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
}


// Авторизация пользователя
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ищем пользователя по email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Неверный логин или пароль",
      });
    }

    // Проверяем пароль
    const isValidPass = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    // Создаем токен
    const token = jwt.sign(
      {
        _id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
}


// Получение информации о пользователе
export const getMe = async (req, res) => {
  try {
    const userId = req.userId;

    // Ищем пользователя по id
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user;

    res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
}