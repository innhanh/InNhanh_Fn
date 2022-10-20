const { Categorys } = require("../../../db/models");
export default async function handler(req, res) {

    if (req.method === "GET") {
        try {
            const list = await Categorys.findAll();
            return res.status(200).json({ Categorys: list })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}