const cloudinary = require('../../../config/cloudinary');
const ArticlesModel = require('../../../DB/Models/Articles.model');

const addArticle = async (req, res) => {
    try{
        const {title, description} = req.body;
        // if(req.user.role !== 'admin'){
        //     return res.status(403).json({message: "You are not authorized to create a product"});
        // }
        const images = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));
        const articles = await ArticlesModel.create({
            title,
            description,
            image: images
        });
        res.status(201).json({message: "Article created successfully", articles});
    }catch(err){
        res.status(500).json({message: "Internal Server Error", Error: err.message});
    }
}

const getArticles = async (req, res) => {
    try{
        const id = req.params.id;
        const findArticle = await ArticlesModel.findById(id);
        if(!findArticle){
            return res.status(404).json({message: "Article not found"});
        }
        res.status(200).json({message: "Articles fatched successfully", data: findArticle});
    }catch(err){
        res.status(500).json({message: "Internal Server Error", Error: err.message});
    }
}

const getAllArticles = async (req, res) => {
    try{
        const total = await ArticlesModel.countDocuments();
        const articles = await ArticlesModel.find({});
        res.status(200).json({message: "Articles fatched successfully", data: articles});
    }catch(err){
        res.status(500).json({message: "Internal Server Error", Error: err.message});
    }
}

const updateArticle = async (req, res) => {
    try{
        const id = req.params.id;
        // if(req.user.role !== 'admin'){
        //     return res.status(403).json({message: "You are not authorized to update a product"});
        // }
        const {title, description} = req.body;
        const articles = await ArticlesModel.findById(id);
        if(!articles){
            return res.status(404).json({message: "Article not found"});
        }
        let images = articles.image;
        if(req.files && req.files.length > 0){
            for(let img of articles.image){
                if(img.public_id){
                    await cloudinary.uploader.destroy(img.public_id);
                }
        }
        images = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));
    }
        const updatedArticle = await ArticlesModel.findByIdAndUpdate(
            id,
            {
            title,
            description,
            image: images
            }, {new: true}
        )
        return res.status(200).json({message: "Article updated successfully", data: updatedArticle});
    }catch(err){
        res.status(500).json({message: "Internal Server Error", Error: err.message});
    }
};

const deleteArticle = async (req, res) => {
    try{
        const article = await ArticlesModel.findById(req.params.id);
        if(!article){
            return res.status(404).json({message: "Article not found"});
        }
        // if(req.user.role !== 'admin'){
        //     return res.status(403).json({message: "You are not authorized to delete a product"});
        // }
        for(let img of article.image){
            if(img.public_id){
                await cloudinary.uploader.destroy(img.public_id);
            }
        }
        const deleteArticle = await ArticlesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Article deleted successfully" , data: deleteArticle});
    }catch(err){
        res.status(500).json({message: "Internal Server Error", Error: err.message});
    }
}

module.exports = {
    addArticle,
    getArticles,
    getAllArticles,
    updateArticle,
    deleteArticle
}
