const modal=weex.requireModule('modal')
const apiURL = {
    slsjUrl:'http://slsj.yy365.cn/',
    slsjGetTemplate: 'Resource/getFileTemplate',
    slsjEdit: 'Contact',
};
import {
    fetch,fetchByPost
} from '../fetch'
import {
} from './api'

/** -----------------slsj------------------*/
export function FETCH_SLSJ_TEMPFILE({commit, dispatch, state}) {
    return fetchSlsjTemp().then(retdata => {
        let data=retdata.data;
        commit('SET_SLSJ_LIST', {data})
    });
}
export function FETCH_SLSJ_NEW({commit, dispatch, state},{body,callback}) {
    return fetchSlsjNew(body).then(retdata => {
        callback(retdata)
    });
}


/** -----------------SLSJ------------------*/
export function fetchSlsjTemp() {
    return fetch(apiURL.slsjUrl+apiURL.slsjGetTemplate)
    // return fetch(`${slsjBaseURL}Resource/getFileTemplate`)
}

export function fetchSlsjNew(body) {
    return fetchByPost(apiURL.slsjUrl+apiURL.slsjEdit,body)
    // return fetch(`${slsjBaseURL}Resource/getFileTemplate`)
}
