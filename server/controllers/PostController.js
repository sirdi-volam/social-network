import prisma from "../prisma/prisma.js";

// Получение последних тегов
export const getLastTags = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const tags = posts
      .flatMap((post) => post.tags)
      .slice(0, 5)

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить теги',
    });
  }
}

// Получение всех постов
export const getAll = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true, // Включаем связанный пользователь
      },
    })

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
}

// Удаление поста
export const remove = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);

    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
}

// Получение одного поста
export const getOne = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    // Проверяем, что id является числом
    if (isNaN(postId)) {
      return res.status(400).json({
        message: "Некорректный ID статьи",
      });
    }

    // Проверяем, что статья с таким id существует
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    if (!post) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    // Увеличиваем счетчик просмотров
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        viewsCount: {
          increment: 1,
        },
      }
    });

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
      error: err.message, // Детализация ошибки
    });
  }
}


// Создание поста
export const create = async (req, res) => {
  try {
    const { title, text, tags, imageUrl } = req.body;

    // Проверка наличия пользователя
    if (!req.userId) {
      return res.status(400).json({
        message: "ID пользователя отсутствует",
      });
    }

    // Проверка существования пользователя
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(400).json({
        message: "Пользователь не найден",
      });
    }

    // Создание поста
    const post = await prisma.post.create({
      data: {
        title,
        text,
        imageUrl,
        tags,
        userId: req.userId, // Берем id пользователя из токена
      },
    });

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
}


// Обновление поста
export const update = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        text,
        imageUrl,
        tags,
        userId: req.userId, // Проверяем, кто обновляет пост
      },
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
}