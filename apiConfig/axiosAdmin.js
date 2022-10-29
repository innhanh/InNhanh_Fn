import { toast } from "react-toastify"
import { rootApi } from "./apiConfig"

export const ApiAdmin = {
    Authen: {
        Login: async (userName, pass, key, dispath, LoginSuccess, router) => {
            await rootApi({
                method: "POST",
                url: "/admin/authen/login",
                data: { userName, pass, key }
            }).then((res) => {
                toast.success(res.data.mess);
                dispath(LoginSuccess(res.data.Admin));
                router.push("/");
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    }
}