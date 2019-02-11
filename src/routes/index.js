const express = require('express');
const router = express.Router();

/**
 * Rendering main page
 */
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;