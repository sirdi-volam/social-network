import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../prisma/prisma.js";


// Настройки для cookies
const COOKIE_OPTIONS = {
  httpOnly: true, // Cookie доступен только серверу
  secure: process.env.NODE_ENV === "production", // Устанавливаем true для HTTPS в продакшене
  sameSite: "Strict", // Защита от CSRF
  maxAge: 30 * 24 * 60 * 60 * 1000, // Срок действия cookie — 30 дней
};

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

    // Устанавливаем cookie
    res.cookie("authToken", token, COOKIE_OPTIONS);

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

    // Устанавливаем cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict", // None для тестирования
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      ...userData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
}

// Выход пользователя
export const logout = (req, res) => {
  try {
    // Удаляем cookie
    res.clearCookie("authToken", COOKIE_OPTIONS);

    res.json({
      message: "Вы вышли из системы",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось выйти",
    });
  }
};


// Получение информации о пользователе
export const getMe = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({
        message: "Нет доступа",
      });
    }

    // Проверяем и декодируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ищем пользователя по id
    const user = await prisma.user.findUnique({
      where: {
        id: decoded._id,
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