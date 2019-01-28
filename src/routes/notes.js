const router = require('express').Router();

router.get('/notes', (reg, res) => {
  res.send('Notes on db');
});

module.exports = router;
