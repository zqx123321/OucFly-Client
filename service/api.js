/**
 * @file: 所有的API都放在这里，同一import即可
 * @author: Yidadaa
 */
import config from '../config'
import {post} from '../utils/request'
import store from '../store/store'

const {url} = config

const funcTable = {
    login: function (params) {
        return post(`${url.root}login`, params)
    },
    check: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}check`, params)
    },
    gradeDetail: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}grade/detail`, params)
    },
    gradeScore: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}grade/score`, params)
    },
    course: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}table`, params)
    },
    coin: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}coin/class`, params)
    },
    dept: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}dept`, params)
    },
    studentList: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}student/list`, params)
    },
    student: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}student`, params)
    },
    orderMajor: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}/order/major`, params)
    },
    orderClass: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}/order/class`, params)
    },
    exam: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}exam`, params)
    },
    query: function (params) {
        if (!params) params = {}
        const {token} = store.getters.token()
        params["token"] = token
        return post(`${url.root}query`, params)
    },
}

// const exportFuncs = {}
//Android不支持Object.entries
//
// Object.entries(funcTable).map(v => {
//     exportFuncs[v[0]] = params => {
//         // 在每个请求中注入用户请求
//         if (v[0] !== 'login') {
//             // 登录请求除外
//             const token = store.getters.token()
//             params = Object.assign({}, params, token)
//         }
//         return post(`${url.root}${v[1]}`, params)
//     }
// })

async function checkLogin() {
    let res = await store.dispatch('checkTokenAvailable');
    if (!(res.success)) {
        uni.navigateTo({
            url: '/pages/login/index'
        })
    }
}

funcTable.checkLogin = checkLogin;
export default funcTable
