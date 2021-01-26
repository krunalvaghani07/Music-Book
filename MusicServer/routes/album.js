const express = require('express');
const albumController = require('../controllers/album');
const router = express.Router();

router.get('/album',albumController.getAlbum);
router.post('/post',albumController.createAlbum);
router.put('/album/:albumId', albumController.editAlbum);
router.delete('/album/:albumId',albumController.deleteAlbum);
module.exports =router;