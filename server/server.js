import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { checkAuth, handleValidationErrors } from './utils/index.js';
import { loginValidation, postCreateValidation, registerValidation } from './utils/validations.js';
import { PostController, UserController } from './controllers/index.js';

const app = express();
const apiRouter = express.Router();


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
app.use(cors({
  origin: 'http://localhost:5173', // доступные домены
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // доступные методы
  allowedHeaders: ['Content-Type', 'Authorization'], // доступные заголовки
  credentials: true, // разрешаем кросс-доменные запросы
}));
// Явная обработка preflight-запросов
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // Успешный ответ без тела
});
app.use("/uploads", express.static('uploads'));

// Пользовательские маршруты
apiRouter.post("/auth/login", loginValidation, handleValidationErrors, UserController.login)
apiRouter.post("/auth/register", registerValidation, handleValidationErrors, UserController.register)
apiRouter.get("/auth/me", checkAuth, UserController.getMe)

// Загрузка изображений
apiRouter.post("/upload", checkAuth, upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});

// Пользовательские маршруты
apiRouter.get('/posts', PostController.getAll);
apiRouter.get('/posts/:id', PostController.getOne);
apiRouter.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
apiRouter.delete("/posts/:id", checkAuth, PostController.remove)
apiRouter.patch("/posts/:id", checkAuth, handleValidationErrors, PostController.update)


app.use('/api', apiRouter);

// Запуск сервера
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`🚀 Server OK`));