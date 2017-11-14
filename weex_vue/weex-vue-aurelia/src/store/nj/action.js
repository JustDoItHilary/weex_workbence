const modal=weex.requireModule('modal')
import {
    fetch,fetchByPost
}
 from '../fetch'
import {
} from './api'

/** -----------------nj------------------*/
//获取申请类型列表
export function FETCH_APPLY_TYPE({commit,state}, {params}) {
    let body='QueryType='+URL_APPLY_GET_TYPE+'&UserGuid='+state.selfToken+'&Params='+params;
    return fetchApply(body)
        .then(data => commit('GET_APPLY_TYPE', {data}))
        .catch(data=> modal.toast({message:data,duration:1}))
}