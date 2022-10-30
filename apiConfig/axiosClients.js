import { toast } from "react-toastify"
import { rootApi } from "./apiConfig";

export const ApiClients = {
    Categorys: async (dispath, PageSuccess) => {
        await rootApi({
            method: "GET",
            url: "/clients/pages"
        }).then((res) => {
            dispath(PageSuccess(res.data.Pages));
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
    },
    Company: async (dispath, CompanySuccess, BranchsSccess) => {
        await rootApi({
            method: "GET",
            url: "/clients/company"
        }).then((res) => {
            dispath(CompanySuccess(res.data.Company));
            dispath(BranchsSccess(res.data.Branchs));
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
    }
}