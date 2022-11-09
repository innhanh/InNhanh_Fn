import { toast } from "react-toastify"
import { rootApi } from "./apiConfig";

export const ApiClients = {
    Categorys: async (dispath, CategorySuccess) => {
        await rootApi({
            method: "GET",
            url: "/clients/pages"
        }).then((res) => {
            dispath(CategorySuccess(res.data.Pages));
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })
    },
    Company: async (dispath, CompanySuccess) => {
        await rootApi({
            method: "GET",
            url: "/clients/companys"
        }).then((res) => {
            dispath(CompanySuccess(res.data.Company));
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })
    },
    GetPagesByCate: async (idCate, setSystem) => {
        await rootApi({
            method: "GET",
            url: `/clients/pages/${idCate}`
        }).then((res) => {
            setSystem(res.data.Pages)
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })
    },
    Productions: async (dispath, ProductionSuccess) => {
        await rootApi({
            method: "GET",
            url: "/clients/productions"
        }).then((res) => {
            dispath(ProductionSuccess(res.data.Productions))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })
    },
    Partners: async (dispath, PartnerSuccess) => {
        await rootApi({
            method: "GET",
            url: "/clients/partners"
        }).then((res) => {
            dispath(PartnerSuccess(res.data.Partners))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error)
            } else {
                toast.error(err)
            }
        })
    },
    Images: {
        GetImageByType: async (type, dispath, ActionSuccess) => {
            await rootApi({
                method: "GET",
                url: `/clients/images/${type}`
            }).then((res) => {
                dispath(ActionSuccess(res.data.List))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
        }
    }
}