import nextConnect from "next-connect";
import multer from "multer";
import { AdminController } from "../../../../../controller/admin";
import { CheckAuthen } from "../../../../../middleware/authen";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/img/partners", // destination folder
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, fileName)
        }
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get((req, res) => {
    return res.status(200).json({ mess: "Upload partner" })
});

apiRoute.use(CheckAuthen, upload.single("partner"));

apiRoute.post(CheckAuthen, AdminController.Manager.Partners.Add);

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};