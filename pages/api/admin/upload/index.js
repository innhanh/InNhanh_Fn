import { Op } from "sequelize";

const multer = require("multer");
const dotenv = require("dotenv").config();

const DIR = './public/img';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {

        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const { Images } = require("../../../../db/models");

export default async function handler(req, res) {
    if (req.method === "POST") {

        const baseURL = req.protocol + '://' + req.get('host');
        const pathImage = baseURL + '/public/images/' + req.file.filename;
        const { name, type } = req.body;
        try {
            const oldImg = await Images.findOne({
                where: {
                    [Op.and]: [
                        { name: name },
                        { url: pathImage }
                    ]
                }
            });
            if (oldImg) {
                return res.status(400).json({ error: "Image already exist!" })
            } else {
                upload.single('photo')
                const newImg = await Images.create({
                    name: name,
                    url: pathImage,
                    type: type,
                    fileName: req.file.filename
                });
                return res.status(201).json({ mess: "Add success!", Image: newImg })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}