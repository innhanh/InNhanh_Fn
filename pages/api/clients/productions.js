const { Productions, Images } = require("../../../db/models");

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const list = await Productions.findAll({
                include:{model:Images}
            });
            return res.status(200).json({ Productions: list })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}