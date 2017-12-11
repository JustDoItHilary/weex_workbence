const modal = weex.requireModule('modal');
var storage = weex.requireModule('storage');


//设置token
export function SET_TOKEN(state, {token, callback}) {
    state.selfToken = token;
    if (callback) {
        callback();
    }
}
//设置 baseUrl
export function SET_BASE_URL(state, {url}) {
    state.baseUrl = url;
}
//设置 baseUrl
export function SET_RATIO(state, {ratio}) {
    state.ratio = ratio;
}
//设置 error
export function SET_ERROR(state, {showType, mess}) {
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

}

export function SET_MEMBER_OPERATOR(state, {data}) {
    if (data.hasOwnProperty('DATA') && data.DATA.length > 0) {
        state.memberOperatorList = data.DATA;
    }
    if (data.hasOwnProperty('CODE')) {
        state.memberOperatorCode = data.CODE;
    }
}

//设置 token
export function SET_ACCESS_TOKEN(state, {data, callback}) {
    var tokens = {};
    tokens.accessToken = data.access_token;
    tokens.refreshToken = data.refresh_token;
    tokens.tokenType = data.token_type;
    tokens.expiresIn = data.expires_in;
    tokens.saveTime = Date.parse(new Date());
    storage.setItem("sy_token", tokens, function (e) {
        // console.log(e, state.tokens);
        if (e.result == "success") {
            callback(true);
        } else {
            modal.toast({message: "存储 token 失败!", doation: 0.3});
            callback(false);
        }
    });
}
export function SET_TOKEN_SAVETIME(state, {time}) {
    state.tokens.saveTime = time;
}

/** -----------------SY--会员信息----------------*/
/** COLSLINK 列排序队列
 SHOWCOLS 显示的列（也包含排列顺序）
 TABLES_INDEX 表格的排序（每个片的排列顺序）
 DESC 表名
 SHOWTYPE 展示格式
 HIDDENCOLS 隐藏行 已废弃，被 SHOWCOLS 替代
 */
export function GET_SY_MEMBERINFO(state, {data}) {
    // console.log(data);
    state.syMemberInfo = [];
    var index = data.hasOwnProperty('Extras') ? data.Extras : '';
    index = index.hasOwnProperty('TABLES_INDEX') ? index.TABLES_INDEX : '';//每个卡片的排列顺序（表格）
    var indexArr = index.split(',');
    var tables = data.hasOwnProperty('Tables') ? data.Tables : {};
    for (var i = 0; i < indexArr.length; i++) {
        for (var key in tables) {
            if (indexArr[i] == key) {
                var item = tables[key];
                var colsLink = item.Extra.SHOWCOLS.split(',');
                item.List = [];
                if (item.Data && item.Data.length > 0) {
                    for (var col = 0; col < colsLink.length; col++) {
                        for (var obj in item.Data[0]) {
                            if (colsLink[col] == obj) {
                                var info = {};
                                info.tit = obj;
                                info.content = item.Data[0][obj];
                                item.List.push(info);
                            }
                        }
                    }
                }
                item.showed = true;
                state.syMemberInfo.push(item);
                break;
            }
        }
    }
    if (state.syMemberInfo.length < 1) {
        SET_ERROR(state, {showType: 1, mess: '暂无会员信息'});
    }
    // console.log(state.syMemberInfo)
}

/*-----------------yyzs-营销活动详情--------------*/
export function SET_CRM(state, {retdata}) {
    state.memberInfo = [];
    // console.log(retdata.DATA);
    if (retdata.hasOwnProperty('DATA')) {
        var data = retdata.DATA;
        var index = data.hasOwnProperty('Extras') ? data.Extras : '';
        index = index.hasOwnProperty('TABLES_INDEX') ? index.TABLES_INDEX : '';
        var indexArr = index.split(',');
        var tables = data.hasOwnProperty('Tables') ? data.Tables : {};
        for (var i = 0; i < indexArr.length; i++) {
            for (var key in tables) {
                if (indexArr[i] == key) {
                    var item = tables[key];
                    var colsLink = item.Extra.SHOWCOLS.split(',');
                    item.List = [];
                    if (item.Data && item.Data.length > 0) {
                        for (var col = 0; col < colsLink.length; col++) {
                            for (var obj in item.Data[0]) {
                                if (colsLink[col] == obj) {
                                    var info = {};
                                    info.tit = obj;
                                    info.content = item.Data[0][obj];
                                    item.List.push(info);
                                }
                            }
                        }
                    }
                    item.showed = true;
                    state.memberInfo.push(item);
                    break;
                }
            }
        }
        // console.log(state.memberInfo)
    }
    if (state.memberInfo.length < 1) {
        SET_ERROR(state, {showType: 1, mess: '暂无营销活动'});
    }
}
/*-----------------yyzs-营销活动 label 选中项--------------*/
export function SET_REP_FIRST_SELECTED(state, {selected}) {
    state.actSelected = selected;
}
/*-----------------yyzs-营销活动 进行中--------------*/
export function SET_ONGOING_ACT(state, {retdata}) {
    state.ongoingAct = [];
    // console.log(retdata);
    if (retdata.hasOwnProperty('DATA')) {
        var data = retdata.DATA;
        if (typeof data === 'object' && Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                // item.LIST=item.TITLE.split(',');
                state.ongoingAct.push(item);
            }
        }
        // console.log(state.ongoingAct);
    }
    if (state.ongoingAct.length < 1) {
        SET_ERROR(state, {showType: 1, mess: '暂无营销活动'});
    }
}
/*-----------------yyzs-营销活动 历史--------------*/
export function SET_HISTORY_ACT(state, {retdata}) {
    state.historyAct = [];
    // console.log(retdata);
    if (retdata.hasOwnProperty('DATA')) {
        var data = retdata.DATA;
        if (typeof data === 'object' && Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                // item.LIST=item.TITLE.split(',');
                state.historyAct.push(item);
            }
        }
        // console.log(state.historyAct);
    }
    if (state.historyAct.length < 1) {
        SET_ERROR(state, {showType: 1, mess: '暂无营销活动'});
    }
}