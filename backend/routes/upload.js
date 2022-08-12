const router = require('express').Router();
const cloudinary = require('cloudinary');
const dotenv = require("dotenv");
const fs = require('fs')
const {verifyToken, verifyAdmin} = require('./verifyToken')


dotenv.config();


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SEC,
})


// uploading image on cloudinary
router.post('/upload', verifyToken, verifyAdmin, (req, res) => {
    try {

        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({msg: "No files were uploaded"})
        }

        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTmpPath(file.tempFilePath);
            return res.status(400).json({msg: "File size is too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmpPath(file.tempFilePath)
            return res.status(400).json({msg: "Invalid file format"})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "ecommerce"}, async (err, result) => {
            
            if(err)     throw err;

            removeTmpPath(file.tempFilePath)

            return res.json({public_id: result.public_id, url: result.secure_url});
        })
    }
    catch(err) {
        return res.status(500).json(err)
    }
})


// Delete Image
router.post('/delete', verifyToken, verifyAdmin, (req, res) => {
    try {
        
        const public_id = req.body.public_id;

        if(!public_id)  return res.status(400).json({msg: "No image Found"});

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {

            if(err)     throw err;
            
            return res.status(200).json({msg: "Image Deleted"})
        })
    } 
    catch (err) {
        return res.status(500).json({msg: err.message})
    }
})


const removeTmpPath = (path) => {
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = router