const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const login = require('../middlewares/login');
const { checkAuthentication } = require('../middlewares/checkAuthentication');
const { checkName } = require('../middlewares/checkName');
const { checkAge } = require('../middlewares/checkAge');
const { checkTalk } = require('../middlewares/checkTalk');

const pathTalker = 'src/talker.json';

const app = express();
app.use(express.json());

app.get('/talker', async (_req, res) => {
  const data = JSON.parse(fs.readFileSync(pathTalker, 'utf-8'));
  res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const info = JSON.parse(fs.readFileSync(pathTalker, 'utf8'));
  const obj = info.find((e) => e.id === Number(req.params.id));

  if (obj) return res.status(200).json(obj);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', login.checkLogin, (_req, res) => {
  const tokenLogin = () => crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token: tokenLogin() });
});

app.post('/talker', checkAuthentication, checkName, checkAge, checkTalk, (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(fs.readFileSync(pathTalker));
    const addTalk = { id: talkers.length + 1, name, age, talk };

    talkers.push(addTalk);
    fs.writeFileSync(pathTalker, JSON.stringify(talkers));
    res.status(201).json(addTalk);
  });

app.put('/talker/:id', checkAuthentication, checkName, checkAge, checkTalk, (req, res) => {
    const checkId = Number(req.params.id);
    const checkTalkers = JSON.parse(fs.readFileSync(pathTalker));
    const upInfo = { id: checkId, ...req.body };

    checkTalkers.filter((event) => event.id !== checkId);
    checkTalkers.push(upInfo);
    fs.writeFileSync(pathTalker, JSON.stringify(checkTalkers));
    res.status(200).json(upInfo);
  });

  app.delete('/talker/:id', checkAuthentication, (req, res) => {
  const checkID = Number(req.params.id);
  const checkTalkers = JSON.parse(fs.readFileSync(pathTalker));
  const target = checkTalkers.filter((e) => e.id !== checkID);

  fs.writeFileSync(pathTalker, JSON.stringify(target));
  res.status(204).json();
});

// Ajuda monitoria crypto //

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.listen(PORT, () => {
  console.log('Online');
});