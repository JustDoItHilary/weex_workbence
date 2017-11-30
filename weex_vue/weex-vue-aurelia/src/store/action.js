const modal=weex.requireModule('modal')
var config=require('../mixins')
import {
    fetchItems, fetchIdsByType, fetchUser,
    fetchNotices, fetchNoticeItem,
    fetchSlsjTemp,
    fetchSlsjNew,
    fetchRep,
    fetchApply,
    fetchSy,
    fetchByPostWithHeader
} from './fetch'
import {
    URL_APPLY_GET_TYPE,
    URL_APPLY_GET_LIST,
    URL_APPLY_GET_APPROVER_LIST,
    URL_APPLY_GET_DETAIL,
    URL_APPLY_NEW,
    URL_APPLY_APPROVE,
    URL_APPLY_COMPLETE,
    URL_APPLY_GET_READER,
    URL_SY_GET_MEMBERINFO,
} from './api'

/** -----------------notice------------------*/
export function FETCH_NOTICE({commit, dispatch, state}) {
    return fetchNotices().then(items => commit('SET_NOTICES', {items}));
}
export function FETCH_NOTICE_ITEM({commit, dispatch, state}) {
    return fetchNoticeItem().then(item => commit('SET_NOTICEITEM', {item}));
}

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
export function FETCH_APPROVER_LIST({commit,state}, {params}) {
    let body='QueryType='+URL_APPLY_GET_APPROVER_LIST+'&UserGuid='+state.selfToken+'&Params='+params;
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
    console.log('BODY: ',body)
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

