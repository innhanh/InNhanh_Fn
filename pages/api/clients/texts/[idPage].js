import { ClientsController } from "../../../../controller/client";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await ClientsController.Texts.HomePage(req, res);
    }
}