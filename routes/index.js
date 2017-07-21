const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/schedule', (req, res) => {
  res.render('schedule');
});

router.get('/services', (req, res) => {
  res.render('services');
});

module.exports = router;
