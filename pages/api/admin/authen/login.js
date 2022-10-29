const { Users } = require("../../../../db/models");

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ Mess: "Admin Login" })
    } else if (req.method === "POST") {
        const { userName, pass, key } = req.body;
        try {
            const admin = await Users.findOne({
                where: {
                    userName: userName
                }
            });
            if (admin) {
                if (pass === admin.pass) {
                    if (key === process.env.KEY_ADMIN) {
                        return res.status(200).json({ mess: "Login successfully!", Admin: admin })
                    } else {
                        return res.status(400).json({ error: "KEY_ADMIN wrong!" });
                    }
                } else {
                    return res.status(400).json({ error: "Password wrong!" });
                }
            } else {
                return res.status(404).json({ error: "Admin not found!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}