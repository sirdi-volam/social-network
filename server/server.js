import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { loginValidation, postCreateValidation, registerValidation } from './utils/validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { PostController, UserController } from './controllers/index.js';

const app = express();

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static('uploads'));

// Маршруты аутентификации
app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login)
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register)
app.get("/auth/me", checkAuth, UserController.getMe)

// Загрузка изображений
app.post("/upload", checkAuth, upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});

// Маршруты постов
app.get("/posts", PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch("/posts/:id", checkAuth, handleValidationErrors, PostController.update)

// Запуск сервера
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`🚀 Server OK`));