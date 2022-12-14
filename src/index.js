const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.get('/talker', async (req, res) => {
const data = JSON.parse(fs.readFileSync('src/talker.json', 'utf-8'));
  res.status(200).json(data);
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.listen(PORT, () => {
  console.log('Online');
});