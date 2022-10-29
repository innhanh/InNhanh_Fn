const { Categorys } = require("../../../../../db/models");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name } = req.body;
        try {
            const oldCate = await Categorys.findOne({
                where: {
                    name: name
                }
            });
            if (oldCate) {
                return res.status(400).json({ error: "Category already exist!" });
            } else {
                const newCate = await Categorys.create({
                    name: name
                });
                return res.status(201).json({ mess: "Add successfully!", Category: newCate })
            }
        } catch (error) {
            return res.status(500).json(error);
        }

    }
}