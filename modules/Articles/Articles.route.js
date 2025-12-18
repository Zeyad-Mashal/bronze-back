const express = require('express');
const router = express.Router();
const { addArticle, getArticles, getAllArticles, updateArticle, deleteArticle } = require('./Controller/Articles.Controller');
// const { auth } = require('../../Middlewares/Auth.middleware');
const { uploadArticles } = require('../../middleware/upload');
const multer = require('multer');

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large', Error: err.message });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ message: 'Too many files', Error: err.message });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: 'Unexpected file field', Error: err.message });
        }
        return res.status(400).json({ message: 'Upload error', Error: err.message });
    }
    if (err) {
        return res.status(400).json({ message: 'File upload error', Error: err.message });
    }
    next();
};

router.post('/addArticle', uploadArticles.array('image', 5), handleMulterError, addArticle);
router.get('/getArticles/:id', getArticles);
router.get('/getAllArticles', getAllArticles);
router.put('/updateArticle/:id', uploadArticles.array('image', 5), handleMulterError, updateArticle);
router.delete('/deleteArticle/:id', deleteArticle);

module.exports = router;