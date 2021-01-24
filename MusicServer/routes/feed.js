const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/songs',feedController.getPosts);
router.post('/post',feedController.createPost);

router.put('/song/:songId', feedController.editSong);
router.delete('/song/:songId',feedController.deleteSong);
module.exports =router;