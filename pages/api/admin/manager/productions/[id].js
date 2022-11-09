import multer from "multer";
import nextConnect from "next-connect";
import { AdminController } from "../../../../../controller/admin";
import { CheckAuthen } from "../../../../../middleware/authen";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/img/productions",
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
    const { id } = req.query;
    return res.status(200).json({ id: id })
});
apiRoute.delete(CheckAuthen, AdminController.Manager.Productions.Delete);

apiRoute.use(CheckAuthen, upload.single("photo"));

apiRoute.put(AdminController.Manager.Productions.Edit);



export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};