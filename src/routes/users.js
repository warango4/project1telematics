const router = require('express').Router();

router.get('/singin', (req, res) => {
  res.render('users/sigin');
});

router.get('/singup', (req, res) => {
  res.render('users/signup');
});

module.exports = router;
