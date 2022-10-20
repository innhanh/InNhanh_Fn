import { toast } from "react-toastify"
import { rootApi } from "./apiConfig";

export const ApiClients = {
    Categorys: async (setCate) => {
        await rootApi({
            method: "GET",
            url: "/clients/categorys"
        }).then((res) => {
            setCate(res.data.Categorys)
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })
    },
    Carousel: async (setCarousel) => {
        await rootApi({
            method: "GET",
            url: "/clients/carousels"
        }).then((res) => {
            setCarousel(res.data.Carousels)
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })
    }
}