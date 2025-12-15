const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storageArticles  = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Articles",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const uploadArticles  = multer({ storage : storageArticles });

const storageServives = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Services",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const uploadServices = multer({ storage : storageServives });

module.exports = {uploadArticles , uploadServices};