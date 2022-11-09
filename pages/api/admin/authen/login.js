import { AdminController } from "../../../../controller/admin";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await AdminController.Authen.Login(req, res)
    }
}