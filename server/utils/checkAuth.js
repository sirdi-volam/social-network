import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

export default async (req, res) => {
  try {
    const token = req.cookies.authToken; // Получаем токен из cookies

    if (!token) {
      return res.status(401).json({ message: "Нет доступа" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded._id },
    });

    if (!user) {
      return res.status(404).json({ message: "Нет доступа" });
    }

    const { passwordHash, ...userData } = user;
    res.json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Нет доступа" });
  }
};
