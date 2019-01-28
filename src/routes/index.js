const router = require('express').Router();

router.get('/', (reg, res) => {
  res.render('index');
});

router.get('/about', (reg, res) => {
  res.render('about');
});

module.exports = router;
