const modal=weex.requireModule('modal')
import {
    fetchItems, fetchIdsByType, fetchUser,
    fetchNotices, fetchNoticeItem,
    fetchSlsjNew,
    fetchRep,
    fetchApply
} from './fetch'

const LOAD_MORE_STEP = 10

// ensure data for rendering given list type
export function FETCH_LIST_DATA({commit, dispatch, state}, {type}) {
    commit('SET_ACTIVE_TYPE', {type})
    console.log(type)
    return fetchIdsByType(type)
        .then(ids => commit('SET_LIST', {type, ids}))
        .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
}

// load more items
export function LOAD_MORE_ITEMS({dispatch, state}) {
    state.counts[state.activeType] += LOAD_MORE_STEP
    return dispatch('ENSURE_ACTIVE_ITEMS')
}

// ensure all active items are fetched
export function ENSURE_ACTIVE_ITEMS({dispatch, getters}) {
    return dispatch('FETCH_ITEMS', {
        ids: getters.activeIds
    })
}

export function FETCH_ITEMS({commit, state}, {ids}) {
    // only fetch items that we don't already have.
    const newIds = ids.filter(id => !state.items[id])
    return newIds.length
        ? fetchItems(newIds).then(items => commit('SET_ITEMS', {items}))
        : Promise.resolve()
}

export function FETCH_USER({commit, state}, {id}) {
    return state.users[id]
        ? Promise.resolve(state.users[id])
        : fetchUser(id).then(user => commit('SET_USER', {user}))
}

/** -----------------notice------------------*/
export function FETCH_NOTICE({commit, dispatch, state}) {
    return fetchNotices().then(items => commit('SET_NOTICES', {items}));
}
export function FETCH_NOTICE_ITEM({commit, dispatch, state}) {
    return fetchNoticeItem().then(item => commit('SET_NOTICEITEM', {item}));
}

/** -----------------slsj------------------*/
export function FETCH_SLSJ_NEW({commit, dispatch, state}) {
    return fetchSlsjNew().then(data => commit('SET_SLSJ_NEW', {data}));
}

/** -----------------apply------------------*/
//获取申请类型列表
export function FETCH_APPLY_TYPE({commit}, {body}) {
    return fetchApply(body)
        .then(data => commit('GET_APPLY_TYPE', {data}))
        .catch(data=> modal.toast({message:data,duration:1}))
}
//获取申请列表（不同类型申请）
export function FETCH_APPLY_LIST({commit}, {body}) {
    return fetchApply(body)
        .then(data => commit('GET_APPLY', {data}))
}
//获取申请详情
export function FETCH_APPLY_DETAIL({commit}, {body}) {
    return fetchApply(body)
        .then(data => commit('GET_APPLY_DETAILS', {data}))
}
//新建申请
export function FETCH_APPLY_NEW({dispatch}, {body, applyListBody, callback}) {
    return fetchApply(body)
        .then(data => {
                dispatch('FETCH_APPLY_LIST', {applyListBody})
                callback(data)
            }
        )
}
//审批申请
export function FETCH_APPLY_APPROVE({dispatch}, {body, applyListBody, callback}) {
    return fetchApply(body)
        .then(data => {
                dispatch('FETCH_APPLY_LIST', {applyListBody})
                callback(data)
            }
        )
}
//完成申请
export function FETCH_APPLY_COMPLETE({ dispatch}, {body, applyListBody, callback}) {
    return fetchApply(body)
        .then(data => {
                dispatch('FETCH_APPLY_LIST', {applyListBody})
                callback(data)
            }
        )
}
//获取所有人员列表
export function FETCH_APPLY_READER({commit}, {body}) {
    return fetchApply(body)
        .then(data => commit('GET_APPLY_READER', {data}))
}

/** -----------------rep------------------*/
export function FETCH_REP({commit, dispatch, state}, body) {
    // console.log('FETCH_REP_BODY: ',body)
    return fetchRep(body).then(items => commit('SET_'))
    // return fetchNotices().then(items => commit('SET_NOTICES',{items}));
}