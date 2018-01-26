const modal = weex.requireModule('modal');
var storage = weex.requireModule('storage');

import {
    replaceTS,isArr
} from '../../mixins'
export function setItem(item) {
    var extra = item.Extra;
    var type = extra.SHOWTYPE;
    item.showed = true;
    item.List = [];
    if (item.Data && item.Data.length > 0) {
        for (var itemIndex in item.Data) {
            if (type == 'CV') {
                var colsLink = extra.SHOWCOLS.split(',');
                for (var col = 0; col < colsLink.length; col++) {
                    for (var obj in item.Data[itemIndex]) {
                        if (colsLink[col] == obj) {
                            var info = {};
                            info.tit = obj;
                            info.content = item.Data[0][obj];
                            item.List.push(info);
                        }
                    }
                }
            } else if (type == 'TS' || type == 'TSLR') {
                var info = {};
                info.tit = replaceTS(extra.TS_TITLE, item.Data[itemIndex]);
                info.content = replaceTS(extra.TS_SUBTITLE, item.Data[itemIndex]);
                item.List.push(info);
            }
        }
    }
    return item;
}
export function getTables(state, {data, name, warning}) {
    // console.log(data);
    if (data.hasOwnProperty('DATA')) {
        data=data.DATA;
        if(data.hasOwnProperty("Extras")){
            var tableIndexArr = data.Extras;
            tableIndexArr = tableIndexArr.hasOwnProperty('TABLES_INDEX') ? tableIndexArr.TABLES_INDEX : '';//每个卡片的排列顺序（表格）
            tableIndexArr = tableIndexArr.split(',');
            var tables = data.hasOwnProperty('Tables') ? data.Tables : {};
            for (var i = 0; i < tableIndexArr.length; i++) {
                for (var key in tables) {
                    if (tableIndexArr[i] == key) {
                        var item = setItem(tables[key]);
                        state[name].push(item);
                        break;
                    }
                }
            }
            if (state[name].length < 1) {
                this.dispatch('setError', {showType: 1, mess: warning});
            }
        }else {
            this.dispatch('setError', {
                showType: 1,
                mess: data.hasOwnProperty('CODE') || data.hasOwnProperty('MESSAGE') ? data.CODE + ':' + data.MESSAGE : '数据格式错误：不存在 Extras'
            });
        }
    } else {
        this.dispatch('setError', {
            showType: 1,
            mess: data.hasOwnProperty('CODE') || data.hasOwnProperty('MESSAGE') ? data.CODE + ':' + data.MESSAGE : '数据格式错误：不存在 DATA'
        });
    }
    // console.log(state[name])
}
export function getTabs(state, {data, name, warning}) {

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

/** COLSLINK 列排序队列
 SHOWCOLS 显示的列（也包含排列顺序）
 TABLES_INDEX 表格的排序（每个片的排列顺序）
 DESC 表名
 SHOWTYPE 展示格式
 HIDDENCOLS 隐藏行 已废弃，被 SHOWCOLS 替代
 */

/** -----------------SY--会员信息----------------*/
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
        this.dispatch('setError', {showType: 1, mess: '暂无会员信息'});
    }
    console.log(state.syMemberInfo)
}
/*------会员消费信息------*/
export function GET_SY_ORDER_DETAIL(state, {data}) {
    // console.log(data);
    state.orderDetail = [];
    this.commit('getTables', {data, name: 'orderDetail', warning: '暂无会员消费信息'});
    // console.log(state.orderDetail);
}

/*------会员健康信息------*/
export function GET_SY_HEALTH_HISTORY(state, {data}) {
    // console.log(data);
    state.syHealthList = [];
    if(data.hasOwnProperty('SELDATA')&&isArr(data.SELDATA)&&data.SELDATA.length>0){
        state.syTabs=data.SELDATA;
        state.syTabs.unshift({NAME:"全部"});
    }
    this.commit('getTables', {data, name: 'syHealthList', warning: '暂无会员健康信息'});
    // console.log(state.orderDetail);
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
        this.dispatch('setError', {showType: 1, mess: '暂无营销活动'});
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
    }
    if (state.ongoingAct.length < 1) {
        this.dispatch('setError', {showType: 1, mess: '暂无营销活动'});
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
                state.historyAct.push(item);
            }
        }
    }
    if (state.historyAct.length < 1) {
        this.dispatch('setError', {showType: 1, mess: '暂无营销活动'});
    }
}