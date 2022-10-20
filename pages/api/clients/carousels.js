const { Images } = require("../../../db/models");
export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const list = await Images.findAll({
                where: {
                    type: "carousel"
                }
            });
            return res.status(200).json({ Carousels: list })
        } catch (error) {
            return res.status(500).json(error)
        }

    }
}