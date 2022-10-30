const { Partners, Images } = require("../../../db/models")

export default async function handle(req, res) {
    if (req.method === "GET") {
        try {
            const list = await Partners.findAll({
                include:{model:Images}
            });
            return res.status(200).json({ Partners: list })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}