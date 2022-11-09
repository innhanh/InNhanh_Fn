const { Op } = require("sequelize");
const { Users, Images, Productions, Partners, RefreshTokens } = require("../../db/models");
const { CreateAccessToken, CreateRefreshToken } = require("../token");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");

const AdminController = {
    Authen: {
        Login: async (req, res) => {
            const { userName, pass, key } = req.body;
            try {
                const Admin = await Users.findOne({
                    where: {
                        userName: userName
                    }
                });
                if (Admin) {
                    if (bcryptjs.compareSync(pass, Admin.pass)) {
                        if (key === process.env.KEY_ADMIN) {
                            const newAccessToken = CreateAccessToken(Admin);
                            const newRefreshToken = CreateRefreshToken(Admin);
                            const [oldRefreshToken, created] = await RefreshTokens.findOrCreate({
                                where: {
                                    refreshToken: newRefreshToken,
                                    idUser: Admin.id
                                }
                            });

                            if (created) {
                                res.cookie("refreshToken", newRefreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    path: "/",
                                    sameSite: "strict",
                                    maxAge: 60 * 1000 * 60 * 24
                                });
                                return res.status(200).json({ Admin: Admin, accessToken: newAccessToken, mess: "Đăng nhập thành công!" })
                            } else {
                                oldRefreshToken.refreshToken = newRefreshToken;
                                await oldRefreshToken.save();
                                res.cookie("refreshToken", newRefreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    path: "/",
                                    sameSite: "strict",
                                    maxAge: 60 * 1000 * 60 * 24
                                });
                                return res.status(200).json({ Admin: Admin, accessToken: newAccessToken, mess: "Đăng nhập thành công!" })
                            }
                        } else {
                            return res.status(400).json({ error: "Key wrong!" })
                        }
                    } else {
                        return res.status(404).json({ error: "Pass wrong!" });
                    }
                } else {
                    return res.status(404).json({ error: "Admin not found!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }

        },
        Logout: async (req, res) => {

        },
        Register: async (req, res) => {

        },
        Edit: async (req, res) => {
            const { id } = req.query;
            const { userName, displayName, phone, email } = req.body;
            try {
                const Admin = await Users.findOne({
                    where: {
                        id: id
                    }
                });
                if (Admin) {
                    if (req.file) {
                        const baseURL = req.protocol + '://' + req.get('host');
                        const pathImage = baseURL + '/img/avatar/' + req.file.filename;
                        return res.status(200).json({ mess: pathImage });

                        // const unLoad = path.join(__dirname, "../../../../../../../public/img/avatar/");
                        // fs.unlink(unLoad + Admin.avatar, async (err) => {
                        //     if (err) {
                        //         return res.status(400).json({ error: "Can not delete image!" })
                        //     } else {
                        //         Admin.userName = userName;
                        //         Admin.displayName = displayName;
                        //         Admin.phone = phone;
                        //         Admin.email = email;
                        //         Admin.avatar = pathImage;
                        //         await Admin.save();
                        //         Admin.pass = null;
                        //         return res.status(200).json({ mess: "Update successfully!", Admin: Admin });
                        //     }
                        // });
                    } else {
                        return res.status(200).json({ mess: "Không File!" });
                    }
                } else {
                    return res.status(404).json({ error: "Admin not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
    },
    Manager: {
        Carousels: {
            Add: async (req, res) => {
                const baseURL = req.protocol + '://' + req.get('host');
                const pathImage = baseURL + '/img/carousels/' + req.file.filename;
                const { name } = req.body;
                try {
                    const carousel = await Images.findOne({
                        where: {
                            [Op.and]: [
                                { type: "carousel" },
                                { url: pathImage }
                            ]
                        }
                    });
                    if (carousel) {
                        return res.status(400).json({ error: "Carousel already exist!" });
                    } else {
                        const [newCarousel, created] = await Images.findOrCreate({
                            where: {
                                name: name,
                                url: pathImage,
                                type: "carousel",
                                fileName: req.file.filename
                            }
                        });
                        if (created) {
                            return res.status(201).json({ mess: "Add successfully!", Carousel: newCarousel });
                        } else {
                            return res.status(400).json({ error: "Image already exist!" })
                        }

                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            },
            Edit: async (req, res) => {
                const { id } = req.query;
                const { newName } = req.body;
                try {
                    const img = await Images.findOne({
                        where: {
                            [Op.and]: [
                                { id: id },
                                { type: "carousel" }
                            ]
                        }
                    });
                    if (img) {
                        if (req.file) {
                            const baseURL = req.protocol + '://' + req.get('host');
                            const pathImage = baseURL + '/img/carousels/' + req.file.filename;

                            const unLoad = path.join(__dirname, "../../../../../../../public/img/carousels/")
                            fs.unlink(unLoad + img.fileName, async (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    img.name = newName;
                                    img.url = pathImage;
                                    await img.save();
                                    return res.status(200).json({ img: img, mess: "Update successfully!" });
                                }
                            });
                        } else {
                            img.name = newName;
                            await img.save();
                            return res.status(200).json({ img: img, mess: "Update successfully!" });
                        }
                    } else {
                        return res.status(404).json({ error: "Image is not found!" });
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            },
            Delete: async (req, res) => {
                const { id } = req.query;
                try {
                    const img = await Images.findOne({
                        where: {
                            [Op.and]: [
                                { type: "carousel" },
                                { id: id }
                            ]
                        }
                    });
                    if (img) {
                        const unLoad = path.join(__dirname, "../../../../../../../public/img/carousels/")
                        fs.unlink(unLoad + img.fileName, async (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                await img.destroy();
                                return res.status(200).json({ mess: "Delete successfully!" })
                            }
                        });
                    } else {
                        return res.status(404).json({ error: "Image is not found!" });
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            }
        },
        Productions: {
            Add: async (req, res) => {
                const { name, size, quantitative, typePaper, tag } = req.body;
                const baseURL = req.protocol + '://' + req.get('host');
                const pathImage = baseURL + '/img/productions/' + req.file.filename;
                try {
                    const img = await Images.findOne({
                        where: {
                            [Op.and]: [
                                { name: name },
                                { url: pathImage }
                            ]
                        }
                    });
                    if (img) {
                        return res.status(400).json({ error: "Image already exist!" });
                    } else {
                        const oldProduc = await Productions.findOne({
                            where: {
                                name: name
                            }
                        });
                        if (oldProduc) {
                            return res.status(400).json({ error: "Production already exist!" });
                        } else {
                            const newImg = await Images.create({
                                name: name,
                                url: pathImage,
                                type: "Productions",
                                fileName: req.file.filename
                            });
                            const newProduc = await Productions.create({
                                name: name,
                                idImage: newImg.id,
                                size: size,
                                quantitative: quantitative,
                                typePaper: typePaper,
                                tag: tag
                            });
                            return res.status(201).json({ mess: "Add successfully!", Production: newProduc })
                        }
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }

            },
            Edit: async (req, res) => {
                const { id } = req.query;
                const { name, size, quantitative, typePaper, tag } = req.body;
                try {
                    const produc = await Productions.findOne({
                        where: {
                            id: id
                        }
                    });
                    if (produc) {
                        if (req.file) {
                            const baseURL = req.protocol + '://' + req.get('host');
                            const pathImage = baseURL + '/img/productions/' + req.file.filename;

                            const oldImg = await Images.findOne({
                                where: {
                                    id: produc.idImage
                                }
                            });

                            const [newImg, created] = await Images.findOrCreate({
                                where: {
                                    name: name,
                                    url: pathImage,
                                    type: "Productions",
                                    fileName: req.file.filename
                                }
                            });
                            if (created) {
                                produc.name = name;
                                produc.idImage = newImg.id;
                                produc.size = size;
                                produc.quantitative = quantitative;
                                produc.typePaper = typePaper;
                                produc.tag = tag;
                                await produc.save();
                                const unLoad = path.join(__dirname, "../../../../../../../public/img/productions/");
                                fs.unlink(unLoad + oldImg.fileName, async (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        await oldImg.destroy();
                                    }
                                })
                                return res.status(200).json({ mess: "Edit successfully!", Image: newImg });
                            } else {
                                return res.status(400).json({ error: "Image already exist!" })
                            }

                        } else {
                            produc.name = name;
                            produc.size = size;
                            produc.quantitative = quantitative;
                            produc.typePaper = typePaper;
                            produc.tag = tag;
                            await produc.save();
                            return res.status(200).json({ mess: "Edit successfully!" });
                        }
                    } else {
                        return res.status(404).json({ error: "Production is not found!" });
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            },
            Delete: async (req, res) => {
                const { id } = req.query;
                try {
                    const produc = await Productions.findOne({
                        where: {
                            id: id
                        }
                    });
                    if (produc) {
                        const oldImg = await Images.findOne({
                            where: {
                                id: produc.idImage
                            }
                        });
                        if (oldImg) {
                            const unLoad = path.join(__dirname, "../../../../../../../public/img/productions/")
                            fs.unlink(unLoad + oldImg.fileName, async (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    await produc.destroy();
                                    await oldImg.destroy();
                                    return res.status(200).json({ mess: "Delete successfully!" })
                                }
                            })
                        } else {
                            return res.status(404).json({ error: "Image is not found!" })
                        }
                    } else {
                        return res.status(404).json({ error: "Production is not found!" })
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            }
        },
        Partners: {
            Add: async (req, res) => {
                const baseURL = req.protocol + '://' + req.get('host');
                const pathImage = baseURL + '/img/partners/' + req.file.filename;
                const { name } = req.body;
                try {
                    const oldPartner = await Partners.findOne({
                        where: {
                            name: name
                        }
                    });
                    if (oldPartner) {
                        return res.status(400).json({ error: "Partner already exist!" })
                    } else {
                        const oldImg = await Images.findOne({
                            where: {
                                [Op.and]: [
                                    { name: name },
                                    { url: pathImage }
                                ]
                            }
                        });
                        if (oldImg) {
                            return res.status(400).json({ error: "Image already exist!" })
                        } else {
                            const newImg = await Images.create({
                                name: name,
                                url: pathImage,
                                type: "Partners",
                                fileName: req.file.filename
                            });
                            const newPartner = await Partners.create({
                                name: name,
                                idImage: newImg.id
                            });
                            return res.status(201).json({ mess: "Add successfully!", Partner: newPartner });
                        }
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            },
            Delete: async (req, res) => {
                const { id } = req.query;
                try {
                    const partner = await Partners.findOne({
                        where: {
                            id: id
                        }
                    });
                    if (partner) {
                        const oldImg = await Images.findOne({
                            where: {
                                id: partner.idImage
                            }
                        });
                        const unLoad = path.join(__dirname, "../../../../../../../public/img/partners/")
                        fs.unlink(unLoad + oldImg.fileName, async (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                await partner.destroy();
                                await oldImg.destroy();
                                return res.status(200).json({ mess: "Delete successfully!" });
                            }
                        })
                    } else {
                        return res.status(404).json({ error: "Production is not found!" });
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            },
            Edit: async (req, res) => {
                const { id } = req.query;
                const { name } = req.body;
                try {
                    const partner = await Partners.findOne({
                        where: {
                            id: id
                        }
                    });
                    if (req.file) {
                        if (partner) {
                            const oldImg = await Images.findOne({
                                where: {
                                    id: partner.idImage
                                }
                            });
                            if (oldImg) {
                                const unLoad = path.join(__dirname, "../../../../../../../public/img/partners/")
                                fs.unlink(unLoad + oldImg.fileName, async (err) => {
                                    if (err) {
                                        return res.status(500).json({ error: "Cannot delete image!" });
                                    } else {
                                        const baseURL = req.protocol + '://' + req.get('host');
                                        const pathImage = baseURL + '/img/partners/' + req.file.filename;

                                        const [newImg, created] = await Images.findOrCreate({
                                            where: {
                                                name: name,
                                                url: pathImage,
                                                type: "Partners",
                                                fileName: req.file.filename
                                            }
                                        });
                                        if (created) {
                                            partner.name = name;
                                            partner.idImage = newImg.id;
                                            await partner.save();
                                            await oldImg.destroy();
                                            return res.status(200).json({ mess: "Update successfully!" });
                                        } else {
                                            return res.status(400).json({ error: "Image already exist!" });
                                        }
                                    }
                                })
                            } else {
                                return res.status(404).json({ error: "Image of Partner not found!" });
                            }
                        } else {
                            return res.status(404).json({ error: "Partner not found!" });
                        }
                    } else {
                        partner.name = name;
                        await partner.save();
                        return res.status(200).json({ mess: "Update successfully!" });
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            }
        }
    },
    Token: {
        RefreshTokens: async (req, res) => {
            return res.status(200).json({ mess: "RefreshToken" })
        }
    }
};

module.exports = {
    AdminController
}