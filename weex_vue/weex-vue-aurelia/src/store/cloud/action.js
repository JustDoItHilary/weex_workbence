const modal = weex.requireModule('modal');
import {
    fetchByPost, fetch
} from '../fetch'
import {
    URL_BASE,
    URL_CLOUD_GET_FOLDER,
    URL_CLOUD_SEARCH_FILE,
    URL_CLOUD_CREATE_FOLDER,
    URL_CLOUD_DELETE_FOLDER,
    URL_CLOUD_DELETE_FILE,
    URL_CLOUD_UPDATE_FOLDER,
    URL_CLOUD_UPDATE_FILE,
    URL_CLOUD_UPLOAD_FILE,
    URL_CLOUD_CANCEL_SHARE,
} from './cloud-api'

/** -----------------CLOUD------------------*/
export function FETCH_CLOUD_GET_FOLDER({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_GET_FOLDER,body)
        .then(retdata => {
            // console.log(retdata)
            commit('SET_FOLDER', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
export function FETCH_CLOUD_SEARCH_FILE({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_SEARCH_FILE,body)
        .then(retdata => {
            console.log(retdata)
            // commit('SET_', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
export function FETCH_CLOUD_CREATE_FOLDER({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_CREATE_FOLDER,body)
        .then(retdata => {
            console.log(retdata)
            // commit('SET_', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
export function FETCH_CLOUD_DELETE_FOLDER({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_DELETE_FOLDER,body)
        .then(retdata => {
            console.log(retdata)
            // commit('SET_', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
export function FETCH_CLOUD_DELETE_FILE({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_DELETE_FILE,body)
        .then(retdata => {
            console.log(retdata)
            // commit('SET_', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
export function FETCH_CLOUD_UPDATE_FOLDER({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_UPDATE_FOLDER,body)
        .then(retdata => {
            console.log(retdata)
            // commit('SET_', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
export function FETCH_CLOUD_UPDATE_FILE({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_UPDATE_FILE,body)
        .then(retdata => {
            console.log(retdata)
            // commit('SET_', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
export function FETCH_CLOUD_UPLOAD_FILE({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_UPLOAD_FILE,body)
        .then(retdata => {
            console.log(retdata)
            // commit('SET_', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
export function FETCH_CLOUD_CANCEL_SHARE({commit, state}, {body}) {
    return fetchBP(URL_CLOUD_CANCEL_SHARE,body)
        .then(retdata => {
            console.log(retdata)
            // commit('SET_', {retdata});
        }, error => {
            // commit('SET_ERROR', {showType:2 ,mess: error});
        })
}


export function fetchBP(type, body) {
    console.log(URL_BASE+type,body);
    return fetchByPost(URL_BASE + type, body)
}
export function fetchBG(type, body) {
    return fetch(URL_BASE + type + '&' + body)
}