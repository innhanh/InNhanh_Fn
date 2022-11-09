
const { Pages, Categorys, Images, Texts, Companys, Branchs, TimeWorks, Partners, Productions } = require("../../db/models");
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
                include: { model: Pages }
            });
            return res.status(200).json({ Pages: list })
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    Images: {
        GetImageByType: async (req, res) => {
            const { type } = req.query;
            try {
                const list = await Images.findAll({
                    where: {
                        type: type
                    }
                });
                return res.status(200).json({ List: list })
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        GetCarousels: async (req, res) => {
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
        },
    },
    Pages: {
        GetAll: async (req, res) => {
            try {
                const list = await Categorys.findAll({
                    include: [
                        { model: Pages, include: { model: Texts } }

                    ]
                });
                return res.status(200).json({ Pages: list })
            } catch (error) {
                return res.status(500).json(error);
            }
        },
    },
    Texts: {
        HomePage: async (req, res) => {
            const { idPage } = req.query;
            try {
                const page = await Pages.findOne({
                    where: {
                        id: idPage
                    }
                });
                if (page) {
                    const list = await Texts.findAll({
                        where: {
                            idPage: idPage
                        }
                    });
                    return res.status(200).json({ HomePageTexts: list });
                } else {
                    return res.status(404).json({ error: "Page is not found!" })
                }

            } catch (error) {
                return res.status(500).json(error)
            }

        }
    },
    Companys: {
        GetAll: async (req, res) => {
            try {
                const company = await Companys.findOne({
                    include: [{ model: Images }, { model: Branchs }, { model: TimeWorks }]
                });
                if (company) {
                    return res.status(200).json({ Company: company });
                } else {
                    return res.status(404).json({ error: "Company not found!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Categorys: {
        GetAll: async (req, res) => {
            try {
                const list = await Categorys.findAll();
                return res.status(200).json({ Categorys: list })
            } catch (error) {
                return res.status(500).json(error)
            }
        }
    },
    Partners: {
        GetAll: async (req, res) => {
            try {
                const list = await Partners.findAll({
                    include: { model: Images }
                });
                return res.status(200).json({ Partners: list })
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Productions: {
        GetAll: async (req, res) => {
            try {
                const list = await Productions.findAll({
                    include: { model: Images }
                });
                return res.status(200).json({ Productions: list })
            } catch (error) {
                return res.status(500).json(error)
            }
        }
    }
}