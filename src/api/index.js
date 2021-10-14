import http from "../utils/axios"

export function getLogin(val) {
    return http({
        url: "/adminapi/login",
        method: "post",
        data: val
    })
}

export function getmenusList() {
    return http({
        url: "/adminapi/menusList",
        method: "get"
    })
}

// 主页

export function getheader() {
    return http({
        url: "/adminapi/home/header",
        method: "get"
    })
}

// 商品管理

export function gettype_header() {
    return http({
        url: "/adminapi/product/product/type_header",
        method: "get"
    })
}
export function getproduct(val) {
    return http({
        url: "adminapi/product/product",
        method: "get",
        params: val
    })
}
export function gettree() {
    return http({
        url: "adminapi/product/category/tree/1",
        method: "get"
    })
}

export function getset_show(val) {
    return http({
        url: "/adminapi/product/product/set_show/" + val.id + "/" + val.is_show,
        method: "put",
    })
}

export function getdel(val) {
    return http({
        url: "/adminapi/product/product/" + val.id,
        method: "DELETE",
    })
}

// 商品分类

export function getcategory(val) {
    return http({
        url: "/adminapi/product/category",
        method: "get",
        params: val
    })
}
export function getset_show2(val) {
    return http.put("/adminapi/product/category/set_show/" + val.id + "/" + val.isShow)
}