import nextConnect from "next-connect";
import multer from "multer";
import { CheckAuthen } from "../../../../middleware/authen";
import { AdminController } from "../../../../controller/admin";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/img/avatar",
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, fileName)
        }
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get(async (req, res) => {
    return res.status(200).json({ mess: "Edit Admin" })
});

apiRoute.use(CheckAuthen, upload.single("photo"));

apiRoute.put(CheckAuthen, AdminController.Authen.Edit);

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};