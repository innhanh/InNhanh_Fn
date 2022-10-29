const { Pages, Categorys } = require("../../db/models");
export const ClientsController = {
    GetPageSystem: async (req, res) => {
        const { idCate } = req.query;
        try {
            const category = await Categorys.findOne({
                where: {
                    id: idCate
                }
            });
            if (category) {
                const list = await Pages.findAll({
                    where: {
                        idCategory: category.id
                    }
                });
                return res.status(200).json({ Pages: list })
            } else {
                return res.status(404).json({ error: "Category not found!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    GetPageNavs: async (req, res) => {
        try {
            const list = await Categorys.findAll({
               include:{model:Pages}
            });
            return res.status(200).json({ Pages: list })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}