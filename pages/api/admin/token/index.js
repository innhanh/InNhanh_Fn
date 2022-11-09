import nextConnect from "next-connect";
import { AdminController } from "../../../../controller/admin";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
});

apiRoute.get(AdminController.Token.RefreshTokens);


export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};