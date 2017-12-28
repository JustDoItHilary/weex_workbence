const state = {
    baseUrl: '',
    // selfToken:'@@ODg4ODg4fEA1NzllZjJlMGVlNWY2fEBjNGMxMDkyOTU5M2NiZWEzZTA3YWE5MTMxYzFjN2U1Mg--',
    // selfToken:'@@OTk5OTk5fEAxNTYyMTg1NjUzM3xAMTFhOGY0MDZiYzc5OWMwOTRjNzFiMmEwYjg5OWU4YWZ8QHYzLjIuMWMxNzA4Mjl8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi',
    selfToken: '',
    ratio: 1,
    errorInfo: {
        errorImg: '',
        errorMess: '加载中...',
    },
}
const getters = {
    /*------ base ------*/
    baseUrl(state){
        return state.baseUrl
    },
    //本人token
    selfToken(state){
        return state.selfToken
    },
    ratio(state){
        return state.ratio;
    },
    errorInfo(state){
        return state.errorInfo
    },
};
const actions = {
    setToken(context,params){
        context.commit('SET_TOKEN',params);
    },
    setBaseUrl(context,params){
        context.commit('SET_BASE_URL',params);
    },
    setError(context,params){
        context.commit('SET_ERROR',params);
    },
    setRatio(context,params){
        context.commit('SET_RATIO',params);
    },
};
const mutations = {
//设置token
    SET_TOKEN(state, {token}) {
        state.selfToken = token;
    },
//设置 baseUrl
    SET_BASE_URL(state, {url}) {
        state.baseUrl = url;
    },
//设置 不同平台的放大倍数
    SET_RATIO(state, {ratio}) {
        state.ratio = ratio;
    },
//设置 error
    SET_ERROR(state, {showType, mess}) {
        // console.log(showType)//showType:0-不显示；1：请求成功-没有数据；2：请求失败-请求服务器失败；3：请求失败-刷新数据失败；4：正在请求-正在请求中的loading
        if (showType == 0) {//请求数据成功后设置
            state.errorInfo.errorMess = '';
            state.errorInfo.errorImg = '';
        } else if (showType == 1) {//页面中 computed 中获取数据时判断列表为空时设置
            // state.errorInfo.errorImg='/drawable/no_data.png';
            state.errorInfo.errorMess = mess;
        } else if (showType == 4) {//初始进入新界面时设置 废弃（改为 refresh 组件）
            state.errorInfo.errorMess = '加载中...';
        } else {//请求失败后设置
            // state.errorInfo.errorImg=showType==2?'/drawable/loading_404.png':'';
            state.errorInfo.errorMess = mess;
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}
