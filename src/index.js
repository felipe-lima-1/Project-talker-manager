const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.get('/talker', async (_req, res) => {
const data = JSON.parse(fs.readFileSync('src/talker.json', 'utf-8'));
  res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const info = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
  const obj = info.find((e) => e.id === Number(req.params.id));

  if (obj) return res.status(200).json(obj);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (_req, res) => {
  const tokenLogin = () => crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token: tokenLogin() });
});

// Ajuda monitoria //

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.listen(PORT, () => {
  console.log('Online');
});