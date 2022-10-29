const { Companys, Branchs } = require("../../../db/models");
export default async function handler(req, res) {

    if (req.method === "GET") {
        try {
            const company = await Companys.findOne();
            if (company) {
                const branchs = await Branchs.findAll(
                    {
                        where: {
                            idCompany: company.id
                        }
                    }
                );
                return res.status(200).json({ Company: company, Branchs: branchs });
            } else {
                return res.status(404).json({ error: "Company not found!" });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}