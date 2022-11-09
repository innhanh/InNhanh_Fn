const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

export const CheckAuthen = (req, res, next) => {
    try {
        const { accesstoken } = req.headers;
        jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Bạn chưa đăng nhập" })
            } else {
                if (user.admin === "Admin") {
                    next();
                } else {
                    return res.status(403).json({ error: "Không đủ quyền truy cập!" })
                }
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
}