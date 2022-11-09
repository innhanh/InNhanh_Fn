import { toast } from "react-toastify"
import { rootApi } from "./apiConfig"

export const ApiAdmin = {
    Authen: {
        Login: async (userName, pass, key, dispath, LoginSuccess, router) => {
            await rootApi({
                method: "POST",
                url: "/admin/authen/login",
                data: {
                    userName: userName,
                    pass: pass,
                    key: key
                }
            }).then((res) => {
                toast.success("Login successfully!");
                dispath(LoginSuccess(res.data));
                router.push("/admin/dashboard");
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Edit: async (id, accessToken, userName, displayName, phone, email, photo, dispath, EditAdminSuccess) => {
            const formData = new FormData();
            formData.append('photo', photo);
            formData.append('userName', userName);
            formData.append('displayName', displayName);
            formData.append('phone', phone);
            formData.append('email', email);

            await rootApi({
                method: "PUT",
                url: `/admin/authen/${id}`,
                data: formData,
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess);
                dispath(EditAdminSuccess(res.data.Admin));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Manager: {
        UpdateCompany: async (id, website, time, photo, dispath, CompanySuccess) => {
            const formData = new FormData();
            formData.append('photo', photo);
            formData.append('website', website);
            formData.append('time', time);
            await rootApi({
                method: "PUT",
                url: `/admin/manager/companys/${id}`,
                data: formData
            }).then((res) => {
                toast.success(res.data.mess);
                dispath(CompanySuccess(res.data.Company))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Carousels: {
            Add: async (name, photo, accessToken) => {
                const formData = new FormData();
                formData.append('photo', photo);
                formData.append('name', name);
                await rootApi({
                    method: "POST",
                    url: `/admin/manager/carousels`,
                    data: formData,
                    headers: {
                        accesstoken: accessToken
                    }
                }).then((res) => {
                    toast.success(res.data.mess);
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })

            },
            Delete: async (accesstoken, id) => {
                await rootApi({
                    method: "DELETE",
                    url: `admin/manager/carousels/${id}`,
                    headers: {
                        accesstoken: accesstoken
                    }
                }).then((res) => {
                    toast.success(res.data.mess);
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })
            },
            Edit: async (accesstoken, id, newName) => {
                await rootApi({
                    method: "PUT",
                    url: `admin/manager/carousels/${id}`,
                    data: {
                        newName: newName
                    },
                    headers: {
                        accesstoken: accesstoken
                    }
                }).then((res) => {
                    toast.success(res.data.mess);
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })
            }
        },
        Productions: {
            Add: async (accessToken, name, size, quantitative, typePaper, tag, photo) => {
                const formData = new FormData();
                formData.append("photo", photo);
                formData.append('name', name);
                formData.append('size', size);
                formData.append('quantitative', quantitative);
                formData.append('typePaper', typePaper);
                formData.append('tag', tag);
                await rootApi({
                    method: "POST",
                    url: "admin/manager/productions",
                    data: formData,
                    headers: {
                        accesstoken: accessToken
                    }
                }).then((res) => {
                    toast.success(res.data.mess);
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })
            },
            Edit: async (accessToken, id, producName, producSize, producQuantati, producTypePaper, producTag, photo) => {
                const formData = new FormData();
                formData.append('name', producName);
                formData.append('size', producSize);
                formData.append('quantitative', producQuantati);
                formData.append('typePaper', producTypePaper);
                formData.append('tag', producTag);
                formData.append('photo', photo);

                await rootApi({
                    method: "PUT",
                    url: `admin/manager/productions/${id}`,
                    data: formData,
                    headers: {
                        accesstoken: accessToken
                    }
                }).then((res) => {
                    toast.success(res.data.mess);
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })
            },
            Delete: async (id, accessToken) => {
                await rootApi({
                    method: "DELETE",
                    url: `admin/manager/productions/${id}`,
                    headers: {
                        accesstoken: accessToken
                    }
                }).then((res) => {
                    toast.success(res.data.mess);
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })
            }
        },
        Partners: {
            Add: async (accessToken, name, photo) => {
                const forrmData = new FormData();
                forrmData.append('partner', photo);
                forrmData.append("name", name);
                await rootApi({
                    method: "POST",
                    url: "/admin/manager/partners",
                    data: forrmData,
                    headers: {
                        accesstoken: accessToken
                    }
                }).then((res) => {
                    toast.success(res.data.mess)
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })
            },
            Delete: async (id, accessToken) => {
                await rootApi({
                    method: "DELETE",
                    url: `/admin/manager/partners/${id}`,
                    headers: {
                        accesstoken: accessToken
                    }
                }).then((res) => {
                    toast.success(res.data.mess)
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })
            },
            Edit: async (id, accessToken, name, photo) => {
                const forrmData = new FormData();
                forrmData.append('photo', photo);
                forrmData.append("name", name);
                await rootApi({
                    method: "PUT",
                    url: `/admin/manager/partners/${id}`,
                    data: forrmData,
                    headers: {
                        accesstoken: accessToken
                    }
                }).then((res) => {
                    toast.success(res.data.mess)
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
}