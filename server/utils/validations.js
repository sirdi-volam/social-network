import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 6 символов").isLength({
    min: 6,
  }),
  body("login", "Логин должен быть минимум 3 символа").isLength({
    min: 3,
  }),
]

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 6 символов").isLength({
    min: 6,
  }),
]

export const postCreateValidation = [
  body("title", "Название поста не может быть пустым").isLength({ min: 3 }).isString(),
  body("text", "Текст поста не может быть пустым").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат тегов").optional().isArray(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
]