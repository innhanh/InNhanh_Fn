import { AdminController } from "../../../../../controller/admin";

export default async function handler(req, res) {
    if (req.method === "GET") {
        // await AdminController.Manager.Carousels.Edit(req, res);
    } else if (req.method === "PUT") {
        await AdminController.Manager.Carousels.Edit(req, res);
    } else if (req.method === "DELETE") {
        await AdminController.Manager.Carousels.Delete(req, res);
    }
}