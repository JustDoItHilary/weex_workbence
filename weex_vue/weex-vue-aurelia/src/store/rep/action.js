const modal = weex.requireModule('modal')
import {
    fetchByPost, fetch
} from '../fetch'
import {
    URL_YIYAO,
    URL_BASE,
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
    URL_REP_GET_WEEKLY_NUM,
} from './rep-api'

/** -----------------rep------------------*/
export function FETCH_USERPLATEFORMCODE({commit, state}, {params, callback}) {
    // var body='QueryType=getUserPlatFormCode&Params=%7B%7D&UserGuid=ODg4ODg4fEA1NzllZjJlMGVlNWY2fEA2YTkxYTg0MmU1ZDkwNzBhNDNkZDlkYzM5ZDljNTY1OQ--';
    var body = 'QueryType=' + URL_REP_GET_USERPLATFORMCODE + '&Params=' + params + '&UserGuid=' + state.base.selfToken;
    state.userPlatformCode = '';
    return fetchUserPlatformCode(body)
        .then(retdata => {
            commit('SET_USERPLATFORMCODE', {retdata, callback});
        }, error => {
            state.userPlatformCode = '';
            commit('SET_ERROR', {showType:2 ,mess: error});
        })

}
//获取工作汇报列表
export function FETCH_REP_LIST({commit, state}, {body, callback}) {
    // var body=JSON.stringify({"code":self.userPlatformCode,"startDate":startDate,"endDate":endDate,"type":1,"cros":""});
    // var body='code='+state.userPlatformCode+'&startDate='+startDate+'&endDate='+endDate+'&type=1&cros=';
    // let body='QueryType='+URL_APPLY_GET_LIST+'&UserGuid='+state.selfToken+'&Params='+params;
    // var body='Params='+params;
    commit('SET_ERROR', {showType:4});
    return fetchRep(URL_REP_GET_LIST, body)
        .then(retdata => {
            commit('SET_ERROR', {showType:0});
            commit('SET_REP_LIST', {retdata, callback});
        }, error => {
            state.repList = [];
            commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
//获取审核人员列表
export function FETCH_REP_EMP({commit, state}, {body}) {
    commit('SET_ERROR', {showType:4});
    return fetchRep(URL_REP_GET_EMP, body)
        .then(
            data =>{
                commit('SET_ERROR', {showType:0});
                commit('SET_REP_EMP', {data})
            }, error => {
            state.empList = [];
                commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
//获取待审核人员列表
// export function FETCH_REP_REVIEW({commit, state}, {body}) {
//     return fetchRep(URL_REP_GET_REVIEW, body)
//         .then(retdata => {
//             commit('SET_REP_REVIEW', {retdata})
//         })
// }
//获取可审核人员列表和上周已审核人员（标注上周未审核人员）
export function FETCH_REP_GET_ALL_AUDITED({commit, state}, {body}) {
    return fetchRep(URL_REP_GET_ALL_AUDITED, body)
        .then(retdata => {
            console.log(retdata);
            commit('SET_ERROR', {showType:0});
            commit('SET_REP_ALL_AUDITED', {retdata})
        }, error => {
            state.reviewList = [];
            commit('SET_ERROR', {showType:2 ,mess: error});
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
            commit('SET_ERROR', {showType:0});
            commit('SET_REP_STATISTICS', {retdata})
        },error=>{
            state.repStatistics=[];
            commit('SET_ERROR', {showType:2 ,mess: error});
        })
}
//获取本月提交统计情况
export function FETCH_GET_WEEKLY_NUM({commit, state}, {body}) {
    return fetchRep(URL_REP_GET_WEEKLY_NUM, body)
        .then(retdata => {
            // console.log(retdata)
            commit('SET_ERROR', {showType:0});
            commit('SET_REP_STATISTICS', {retdata})
        },error=>{
            state.repStatistics=[];
            commit('SET_ERROR', {showType:2 ,mess: error});
        })
}


/** -----------------rep------------------*/
export function fetchUserPlatformCode(body) {
    return fetchByPost(URL_YIYAO + 'handle', body)
}
export function fetchRep(type, body) {
    return fetchByPost(URL_BASE + type, body)
}
export function fetchRepByGet(type, body) {
    return fetch(URL_BASE + type + '&' + body)
}