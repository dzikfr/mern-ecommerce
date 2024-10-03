import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import productRoute from "./routes/productRoute.js";

config();

const app = express();

//use cors and json
app.use(cors());
app.use(express.json());

//listening server
app.listen(process.env.PORT, () => console.log(`Server berjalan pada PORT ${process.env.PORT}`));


//database connecting
mongoose
    .connect(process.env.mongoDb)
    .then(() => console.log("Database terkoneksi"))
    .catch((error) => console.log(error));



//route
app.use('/product', productRoute);


//config with cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.use((req, res, next)=>{
    req.cloudinary = cloudinary;
    next();
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'image',
        allowedFormats: ['jpeg', 'png', 'png']
    }
})

const parser = multer({ storage: storage});


//upload to cloudinary
app.post('/upload-image', parser.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).send('No file uploaded');
    }

    try {
        if(!req.file.path){
            throw new Error('File uploaded, but no path available');
        }
        res.json({secure_url: req.file.path});
        
    } catch (error) {
        console.error('Error during file uploaded', error);
        res.status(500).send('Internal server error');
    }
});