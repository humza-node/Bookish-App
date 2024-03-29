const express = require('express');
const LibraryControll = require('../controllers/library');
const router = express.Router();
router.get("/get-favo", LibraryControll.getFavCount);
router.get("/get-bookmarks",LibraryControll.getBookmarkCount);
router.get("/get-highlights", LibraryControll.getHighLights);
router.get("/get-finish", LibraryControll.getFinish);
router.get("/get-downloads", LibraryControll.getDownloads);
router.get("/get-playlist", LibraryControll.getPlaylist);
module.exports=router;