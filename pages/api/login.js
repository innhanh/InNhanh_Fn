export default async function (req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ Mess: "Login" })
    } else if (req.method === "POST") {
        return res.status(200).json({ Mess: "Login" })
    }
}