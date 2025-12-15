const express = require('express');
const router = express.Router();
const { addArticle, getArticles, getAllArticles, updateArticle, deleteArticle } = require('./Controller/Articles.Controller');
// const { auth } = require('../../Middlewares/Auth.middleware');
const { uploadArticles } = require('../../middleware/upload');

router.post('/addArticle', uploadArticles.array('image', 5), addArticle);
router.get('/getArticles/:id', getArticles);
router.get('/getAllArticles', getAllArticles);
router.put('/updateArticle/:id', uploadArticles.array('image', 5), updateArticle);
router.delete('/deleteArticle/:id', deleteArticle);

module.exports = router;