const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Бэкэнд работает');
});

app.listen(PORT, () => console.log(`Сервер работает на http://localhost:${PORT}`));