const modal=weex.requireModule('modal');
const configModule = weex.requireModule('configModule');
import {
    fetch,fetchByPost,fetchByPostWithHeader
} from '../fetch'
const apiURL = {
    syUrl: 'http://im.yiyao365.cn/yyzs/',
    appUrl:"http://211.159.177.97:8091/",
}
import {
    URL_SY_GET_MEMBERINFO,
} from './api'

/** -----------------yyzs------------------*/
export function FETCH_SY_MEMBERINFO({commit, state},{params}) {
    let body='QueryType='+URL_SY_GET_MEMBERINFO+'&UserGuid='+state.selfToken+'&Params='+params;
    // console.log('FETCH_SY_BODY: ',body)
    return fetchSy(body)
        .then(data => commit('GET_SY_MEMBERINFO',{data}))
}


/** -----------------SY------------------*/
export function fetchSy(body) {
    // modal.alert({message:body,duration:1})
    // return fetchByPost(apiURL.getNotices,body)
    return fetchByPost(apiURL.syUrl+'handle',body)
}


export function FETCH_QUERY_MEMBER_OPERATOR({commit,state},{body,header,callback}) {
    console.log(body,JSON.stringify(header));
    return fetchByPostWithHeader(apiURL.appUrl+'api/AppMember/QueryMemberOperator/1000084096',body,header)
        .then(data=>{
            console.log(data);
            commit('SET_MEMBER_OPERATOR',{data})
        })
}



/*-----------------getToken--------------*/
export function FETCH_GET_TOKEN({commit,state},{body,header,callback}) {
    return fetchByPostWithHeader(apiURL.appUrl+'token',body,header)
        .then(data=>{
            commit('SET_ACCESS_TOKEN',{data,callback})
        },function (error) {
            configModule.finish();
        })
}