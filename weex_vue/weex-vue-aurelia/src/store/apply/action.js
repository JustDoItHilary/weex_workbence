const modal=weex.requireModule('modal')
import {
    fetchByPost,fetch
} from '../fetch'
const apiURL = {
    yiyaoUrl: 'http://im.yiyao365.cn/'
}
import {
    URL_APPLY_GET_TYPE,
    URL_APPLY_GET_LIST,
    URL_APPLY_GET_NO_APPLY_LIST,
    URL_APPLY_GET_DETAIL,
    URL_APPLY_NEW,
    URL_APPLY_APPROVE,
    URL_APPLY_COMPLETE,
    URL_APPLY_GET_READER,
} from './api'

/** -----------------apply------------------*/
//获取申请类型列表
export function FETCH_APPLY_TYPE({commit,state}, {params}) {
    let body='QueryType='+URL_APPLY_GET_TYPE+'&UserGuid='+state.selfToken+'&Params='+params;
    return fetchApply(body)
        .then(data => commit('GET_APPLY_TYPE', {data}))
        .catch(data=> modal.toast({message:data,duration:1}))
}
//获取申请列表
export function FETCH_APPLY_LIST({commit,state}, {params}) {
    let body='QueryType='+URL_APPLY_GET_LIST+'&UserGuid='+state.selfToken+'&Params='+params;
    return fetchApply(body)
        .then(data => commit('GET_APPLY', {data}))
}
//获取待审批列表
export function FETCH_NO_APPLY_LIST({commit,state}, {params}) {
    let body='QueryType='+URL_APPLY_GET_NO_APPLY_LIST+'&UserGuid='+state.selfToken+'&Params='+params;
    return fetchApply(body)
        .then(data => commit('GET_APPLY', {data}))
}
//获取申请详情
export function FETCH_APPLY_DETAIL({commit,state}, {params}) {
    let body='QueryType='+URL_APPLY_GET_DETAIL+'&UserGuid='+state.selfToken+'&Params='+params;
    return fetchApply(body)
        .then(data => commit('GET_APPLY_DETAILS', {data}))
}
//新建申请
export function FETCH_APPLY_NEW({dispatch,state}, {params, applyListParams, callback}) {
    let body='QueryType='+URL_APPLY_NEW+'&UserGuid='+state.selfToken+'&Params='+params;
    // console.log('BODY: ',body)
    return fetchApply(body)
        .then(data => {
                dispatch('FETCH_APPLY_LIST', {applyListParams})
                callback(data)
            }
        )
}
//审批申请
export function FETCH_APPLY_APPROVE({dispatch,state}, {params, applyListParams, callback}) {
    let body='QueryType='+URL_APPLY_APPROVE+'&UserGuid='+state.selfToken+'&Params='+params;
    return fetchApply(body)
        .then(data => {
                dispatch('FETCH_APPLY_LIST', {applyListParams})
                callback(data)
            }
        )
}
//完成申请
export function FETCH_APPLY_COMPLETE({ dispatch,state}, {params, applyListParams, callback}) {
    let body='QueryType='+URL_APPLY_COMPLETE+'&UserGuid='+state.selfToken+'&Params='+params;
    return fetchApply(body)
        .then(data => {
                dispatch('FETCH_APPLY_LIST', {applyListParams})
                callback(data)
            }
        )
}
//获取所有人员列表
export function FETCH_APPLY_READER({commit,state}, {params}) {
    let body='QueryType='+URL_APPLY_GET_READER+'&UserGuid='+state.selfToken+'&Params='+params;
    return fetchApply(body)
        .then(data => commit('GET_APPLY_READER', {data}))
}



/** -----------------APPLY------------------*/
export function fetchApply(body) {
    // modal.alert({message:body,duration:1})
    // return fetchByPost(apiURL.getNotices,body)
    return fetchByPost(apiURL.yiyaoUrl+'handle',body)
}