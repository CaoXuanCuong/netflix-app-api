// const cloudinary = require('cloudinary').v2;
// import cloudinaryModule from "cloudinary";
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// const cloudinary = cloudinaryModule.v2;

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'jpeg', 'png'],
    params: {
        folder: 'MovieApp',
    },
    filename: (req, file, cb) => {
        const fileExt = file.originalname.split('.').pop();
        const filename = `${new Date().getTime()}.${fileExt}`;

        cb(null, filename);
    },
    limits: {
        fieldNameSize: 200,
        fileSize: 30 * 1024 * 1024,
    },
});

module.exports = {
    storage,
};