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
        url: "/adminapi/product/product/" + val,
        method: "delete",
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
export function getjiacreate(val) {
    return http({
        url: "/adminapi/product/category/create",
        method: "get"
    })
}
export function getjiacategory(val) {
    return http({
        url: "/adminapi/product/category.html",
        method: "post",
        params: val
    })
}
export function getcategoryid(val) {
    return http({
        url: "/adminapi/product/category/" + val.id,
        method: "get"
    })
}
export function getcategoryget(val) {
    return http({
        url: "/adminapi/product/category/" + val.id,
        method: "put",
        data: val.data
    })
}
export function getset_show2(val) {
    return http.put("/adminapi/product/category/set_show/" + val.id + "/" + val.isShow)
}
export function getdelete2(val) {
    return http.delete("/adminapi/product/category/" + val.id)
}

// 商品评论
export function getreply(val) {
    return http({
        url: "/adminapi/product/reply",
        method: "get",
        params: val
    })
}
export function getset_reply(val) {
    return http.put("/adminapi/product/reply/set_reply/" + val.id, val.data)
}
// 商品规格

export function getrule(val) {
    return http({
        url: "adminapi/product/product/rule",
        method: "get",
        params: val
    })
}


// 用户管理
export function getuser(val) {
    return http({
        url: "/adminapi/user/user",
        method: "get",
        params: val
    })
}
export function getedit(val) {
    return http({
        url: "/adminapi/user/user/" + val + "/edit",
        method: "get",
    })
}
export function gethtml(val) {
    return http("/adminapi" + val.action, val.data)
}
// 会员等级
export function getvip_list(val) {
    return http({
        url: "/adminapi/user/user_level/vip_list",
        method: "get",
        params: val
    })
}
// 用户分组
export function getlist(val) {
    return http({
        url: "/adminapi/user/user_group/list",
        method: "get",
        params: val
    })
}
// 分销员管理
export function getagent(val) {
    return http({
        url: "/adminapi/agent/index",
        method: "get",
        params: val
    })
}
export function getstatistics(val) {
    return http({
        url: "/adminapi/agent/statistics",
        method: "get",
        params: val
    })
}

