const modal = weex.requireModule('modal')
import {
    fetchByPost, fetch
} from '../fetch'
const apiURL = {
    yiyaoUrl: 'http://im.yiyao365.cn/',
    // baseUrl: 'http://daily.romens.cn/Handler/DailyAPIHandler.ashx?action=',
    baseUrl: 'http://192.168.100.117:8095/Handler/DailyAPIHandler.ashx?action=',
    // baseUrl: 'http://192.168.100.96:8090/Handler/DailyAPIHandler.ashx?action=',

}
import {
    URL_REP_GET_USERPLATFORMCODE,
    URL_REP_GET_LIST,
    URL_REP_UPLOAD,
    URL_REP_GET_EMP,
    URL_REP_GET_REVIEW,
    URL_REP_AUDIT,
    URL_REP_DELETE,
    URL_REP_SAVE,
    URL_REP_GET_LAST_NFNUM,
    URL_REP_GET_COMMENTS,
    URL_REP_GET_STATISTICS,
    URL_REP_GET_ALL_AUDITED,
} from './api'

/** -----------------rep------------------*/
export function FETCH_USERPLATEFORMCODE({commit, state}, {params, callback}) {
    // var body='QueryType=getUserPlatFormCode&Params=%7B%7D&UserGuid=ODg4ODg4fEA1NzllZjJlMGVlNWY2fEA2YTkxYTg0MmU1ZDkwNzBhNDNkZDlkYzM5ZDljNTY1OQ--';
    var body = 'QueryType=' + URL_REP_GET_USERPLATFORMCODE + '&Params=' + params + '&UserGuid=' + state.selfToken;
    state.userPlatformCode = '';
    return fetchUserPlatformCode(body)
        .then(retdata => {
            commit('SET_USERPLATFORMCODE', {retdata, callback});
        }, errorData => {
            state.userPlatformCode = '';
        })

}
//获取工作汇报列表
export function FETCH_REP_LIST({commit, state}, {body, callback}) {
    // var body=JSON.stringify({"code":self.userPlatformCode,"startDate":startDate,"endDate":endDate,"type":1,"cros":""});
    // var body='code='+state.userPlatformCode+'&startDate='+startDate+'&endDate='+endDate+'&type=1&cros=';
    // let body='QueryType='+URL_APPLY_GET_LIST+'&UserGuid='+state.selfToken+'&Params='+params;
    // var body='Params='+params;
    return fetchRep(URL_REP_GET_LIST, body)
        .then(retdata => {
            // console.log(retdata)
            commit('SET_REP_LIST', {retdata, callback})
        }, errorData => {
            state.repList = [];
        })
}
//获取审核人员列表
export function FETCH_REP_EMP({commit, state}, {body}) {
    return fetchRep(URL_REP_GET_EMP, body)
        .then(
            data => commit('SET_REP_EMP', {data}),
            errorData => {
            state.empList = [];
        })
}
//获取待审核人员列表
export function FETCH_REP_REVIEW({commit, state}, {body}) {
    return fetchRep(URL_REP_GET_REVIEW, body)
        .then(retdata => {
            // console.log(retdata);
            commit('SET_REP_REVIEW', {retdata})
        })
}
//获取可审核人员列表和上周已审核人员（标注上周未审核人员）
export function FETCH_REP_GET_ALL_AUDITED({commit, state}, {body}) {
    return fetchRep(URL_REP_GET_ALL_AUDITED, body)
        .then(retdata => {
            commit('SET_REP_ALL_AUDITED', {retdata})
        }, errorData => {
            state.reviewList = [];
        })
}
//审核
export function FETCH_REP_AUDIT({state}, {body, callback}) {
    return fetchRep(URL_REP_AUDIT, body)
        .then(retdata => callback(retdata))
}
//删除
export function FETCH_REP_DELETE({state}, {body, callback}) {
    return fetchRep(URL_REP_DELETE, body)
        .then(retdata => callback(retdata))
}
//插入---已经废弃
export function FETCH_REP_UPLOAD({commit, state}, {body, callback}) {
    return fetchRep(URL_REP_UPLOAD, body)
        .then(retdata => callback(retdata))
}
//保存&提交
export function FETCH_REP_SAVE({commit, state}, {body, callback}) {
    return fetchRep(URL_REP_SAVE, body)
        .then(retdata => callback(retdata))
}
//获取上周待审核数目
export function FETCH_REP_GET_LAST_NFNUM({commit, state}, {body}) {
    state.lastNFNum='';
    return fetchRep(URL_REP_GET_LAST_NFNUM, body)
        .then(retdata => {
            commit('SET_REP_LAST_NFNUM', {retdata})
        },errorData=>{
            state.lastNFNum='';
        })
}
//获取审核评价
export function FETCH_REP_GET_COMMENTS({commit, state}, {body}) {
    return fetchRep(URL_REP_GET_COMMENTS, body)
        .then(retdata => {
            // console.log(retdata)
            commit('SET_REP_ASSESSMENT', {retdata})
        },errorData=>{
            state.assessment=[];
        })
}
//获取提交统计情况
export function FETCH_REP_GET_STATISTICS({commit, state}, {body}) {
    return fetchRep(URL_REP_GET_STATISTICS, body)
        .then(retdata => {
            commit('SET_REP_STATISTICS', {retdata})
        },errorData=>{
            state.repStatistics=[];
        })
}


/** -----------------rep------------------*/
export function fetchUserPlatformCode(body) {
    return fetchByPost(apiURL.yiyaoUrl + 'handle', body)
}
export function fetchRep(type, body) {
    return fetchByPost(apiURL.baseUrl + type, body)
}
export function fetchRepByGet(type, body) {
    return fetch(apiURL.baseUrl + type + '&' + body)
}