const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storageArticles  = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Articles",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
  },
});

// Multer configuration with file size limits (4MB per file, max 5 files = ~20MB total)
// Note: Vercel has a 4.5MB total request body limit, so we limit to 4MB per file
const uploadArticles  = multer({ 
  storage: storageArticles,
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB per file
    files: 5 // Max 5 files
  }
});

const storageServives = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Services",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
  },
});

const uploadServices = multer({ 
  storage: storageServives,
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB per file
    files: 10 // Max 10 files
  }
});

module.exports = {uploadArticles , uploadServices};