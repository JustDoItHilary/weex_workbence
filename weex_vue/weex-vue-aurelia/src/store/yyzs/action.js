const modal = weex.requireModule('modal');
const configModule = weex.requireModule('configModule');
import {
    fetch, fetchByPost, fetchByPostWithHeader
} from '../fetch'
const apiURL = {
    syUrl: 'http://im.yiyao365.cn/yyzs/',
    appUrl: "http://211.159.177.97:8091/",
}
import {
    URL_SY_GET_MEMBERINFO,
    URL_YYZS_GET_CRM,
    URL_YYZS_SIGN_IN,
    URL_YYZS_GET_ONGOING_ACT,
    URL_YYZS_GET_HISTORY_ACT,
    URL_YYZS_REPAIR_MEMBER,
    URL_YYZS_QUERY_ORDER_DETAIL,
} from './api'

/** -----------------yyzs-会员信息------------------*/
export function FETCH_SY_MEMBERINFO({commit, state}, {params}) {
    let body = 'QueryType=' + URL_SY_GET_MEMBERINFO + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
    // console.log('FETCH_SY_BODY: ',body)
    return fetchByPost(apiURL.syUrl + 'handle', body)
        .then(
            data => {
                commit('SET_ERROR', {showType:0});
                commit('GET_SY_MEMBERINFO', {data});
            },
            error => {
                state.syMemberInfo = [];
                commit('SET_ERROR', {showType:2 ,mess: error});
                // commit('SET_ERROR', {showType:1,mess: error});//会员信息，不许刷新-showType=1
            }
        )
}

/** -----------------yyzs-会员近期消费------------------*/
export function FETCH_QUERY_ORDER_DETAIL({commit, state}, {params}) {
    let body = 'QueryType=' + URL_YYZS_QUERY_ORDER_DETAIL + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
    console.log('FETCH_SY_BODY: ',body)
    return fetchByPost(apiURL.syUrl + 'handle', body)
        .then(
            data => {
                commit('SET_ERROR', {showType:0});
                commit('GET_SY_ORDER_DETAIL', {data});
            },
            error => {
                state.orderDetail = [];
                commit('SET_ERROR', {showType:2 ,mess: error});
                // commit('SET_ERROR', {showType:1,mess: error});//会员信息，不许刷新-showType=1
            }
        )
}

// /** -----------------yyzs-会员近期消费------------------*/
// export function FETCH_QUERY_ORDER_DETAIL({commit,state},{id,body,header}) {
//     // let body = 'QueryType=' + URL_YYZS_QUERY_ORDER_DETAIL + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
//     console.log(id,body);
//     return fetchByPostWithHeader(apiURL.appUrl +'api/SYCRMAPPOrder/QueryOrderDetailLately/'+id, body,header)
//         .then(
//             data => {
//                 console.log(data);
//                 commit('SET_ERROR', {showType:0});
//                 commit('GET_SY_ORDER_DETAIL', {data});
//             },
//             error => {
//                 state.orderDetail = [];
//                 commit('SET_ERROR', {showType:2 ,mess: error});
//                 // commit('SET_ERROR', {showType:1,mess: error});//会员信息，不许刷新-showType=1
//             }
//         )
// }

// /** -----------------yyzs-会员近期消费------------------*/
// export function FETCH_QUERY_ORDER_DETAIL({commit,state},{id,body,header}) {
//     // let body = 'QueryType=' + URL_YYZS_QUERY_ORDER_DETAIL + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
//     console.log(body);
//     return fetchByPostWithHeader(apiURL.appUrl +'api/SYCRMAPPOrder/QueryOrderDetailLately/'+id, body,header)
//         .then(
//             data => {
//                 console.log(data);
//                 // commit('SET_MEMBER_OPERATOR', {data})
//             },
//             error => {
//                 // state.memberOperatorCode = '';
//                 // state.memberOperatorList = [];
//                 commit('SET_ERROR', {mess: error});
//             }
//         )
// }
/*-------修复会员信息---------*/
export function FETCH_SY_REPAIR_MEMBER({commit,state}, {params,callback}) {
    let body = 'QueryType=' + URL_YYZS_REPAIR_MEMBER + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
    // console.log('FETCH_SY_BODY: ',body)
    return fetchByPost(apiURL.syUrl + 'handle', body)
        .then(
            data => {
                // console.log(data);
                if(data.hasOwnProperty("DATA")){
                    var ret=data.DATA;
                    if(ret.hasOwnProperty("RETURNVALUE")&&ret.RETURNVALUE=="0"){
                        callback();
                    }else{
                        commit('SET_ERROR', {showType:2 ,mess: "会员信息修复失败"});
                    }
                }
            },
            error => {
                commit('SET_ERROR', {showType:2 ,mess: error});
            }
        )
}

/*-------会员转交---------*/
export function FETCH_QUERY_MEMBER_OPERATOR({commit, state}, {body, header, callback}) {
    // console.log(body, JSON.stringify(header));
    return fetchByPostWithHeader(apiURL.appUrl + 'api/SYCRMAPPMember/QueryMemberOperator/1000084096', body, header)
        .then(
            data => {
                // console.log(data);
                commit('SET_MEMBER_OPERATOR', {data})
            },
            error => {
                state.memberOperatorCode = '';
                state.memberOperatorList = [];
                commit('SET_ERROR', {mess: error});
            }
        )
}

/*-----------------getToken--------------*/
export function FETCH_GET_TOKEN({commit, state}, {body, header, callback}) {
    return fetchByPostWithHeader(apiURL.appUrl + 'token', body, header)
        .then(
            data => {
                commit('SET_ACCESS_TOKEN', {data, callback})
            }, error => {
                configModule.finish();
            })
}

/*-----------------yyzs-营销活动详情--------------*/
export function FETCH_GET_CRM({commit, state}, {params}) {
    var body = 'QueryType=' + URL_YYZS_GET_CRM + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
    return fetchByPost(apiURL.syUrl + 'handle', body)
        .then(
            retdata => {
                commit('SET_ERROR', {showType:0});
                commit('SET_CRM', {retdata});
            },
            error => {
                commit('SET_ERROR', {showType:state.memberInfo.length>0?3:2 ,mess: error});
            })
}
/*-----------------yyzs-营销互动详情签到--------------*/
export function FETCH_SIGN_IN({commit, state}, {params,callback}) {
    var body = 'QueryType=' + URL_YYZS_SIGN_IN + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
    console.log(body);
    return fetchByPost(apiURL.syUrl + 'handle', body)
        .then(
            retdata => {
                // console.log(retdata);
                commit('SET_ERROR', {showType:0});
                callback();
            },
            error => {
                modal.toast({message:"签到失败："+error,duration:2});
                // commit('SET_ERROR', {showType:3 ,mess: error});//签到刷新-showType=3
            })
}
/*-----------------yyzs-营销活动-进行中列表--------------*/
export function FETCH_GET_ONGOING_ACT({commit, state}, {params}) {
    var body = 'QueryType=' + URL_YYZS_GET_ONGOING_ACT + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
    return fetchByPost(apiURL.syUrl + 'handle', body)
        .then(
            retdata => {
                commit('SET_ERROR', {showType:0});
                commit('SET_ONGOING_ACT',{retdata});
            },
            error => {
                commit('SET_ERROR', {showType:state.ongoingAct.length>0?3:2 ,mess: error});
            })
}
/*-----------------yyzs-营销活动-历史列表--------------*/
export function FETCH_GET_HISTORY_ACT({commit, state}, {params}) {
    var body = 'QueryType=' + URL_YYZS_GET_HISTORY_ACT + '&UserGuid=' + state.base.selfToken + '&Params=' + params;
    return fetchByPost(apiURL.syUrl + 'handle', body)
        .then(
            retdata => {
                // console.log(retdata);
                commit('SET_ERROR', {showType:0});
                commit('SET_HISTORY_ACT',{retdata});
            },
            error => {
                commit('SET_ERROR', {showType:state.historyAct.length>0?3:2 ,mess: error});
            })
}