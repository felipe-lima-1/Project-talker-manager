function checkWatchedAt(req, res) {
    const validate = /^\d{2}\/\d{2}\/\d{4}$/;
    const { talk } = req.body;

    if (!talk.watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!(validate.test(talk.watchedAt))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  }

  function checkRate(req, res) {
    const numbers = [1, 2, 3, 4, 5];
    const { talk } = req.body;

    if (talk.rate === undefined) { // ?? //
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!(numbers.includes(talk.rate))) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  }

  function checkTalk(req, res, next) {
    const { talk } = req.body;

   if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    checkWatchedAt(req, res);
    checkRate(req, res);
    next();
  }

  module.exports = { 
    checkTalk,
};

// Ajuda mentoria !rate to rate === undefinded //