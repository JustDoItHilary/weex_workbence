const modal = weex.requireModule('modal');
var storage = weex.requireModule('storage');


//设置token
export function SET_TOKEN(state, {token}) {
    state.selfToken = token;
}
//设置 baseUrl
export function SET_BASE_URL(state, {url}) {
    state.baseUrl = url;
}
//设置 baseUrl
export function SET_RATIO(state, {ratio}) {
    state.ratio = ratio;
}
//设置 baseUrl
export function SET_ERROR(state, {showType, mess}) {
    // state.errorInfo.showType=showType;
    if(showType==0){
        state.errorInfo.errorMess='';
        state.errorInfo.errorImg='';
    }else if(showType==1){
        state.errorInfo.errorImg='/drawable/no_found.png';
        state.errorInfo.errorMess='无数据';
    }else {
        state.errorInfo.errorImg=showType==2?'/drawable/loading_404.png':'';
        state.errorInfo.errorMess=mess;
    }

}




/** -----------------SY--会员信息----------------*/
export function GET_SY_MEMBERINFO(state, {data}) {
    state.syMemberInfo = [];
    var index = data.hasOwnProperty('Extras') ? data.Extras : '';
    index = index.hasOwnProperty('TABLES_INDEX') ? index.TABLES_INDEX : '';
    var indexArr = index.split(',');
    var tables = data.hasOwnProperty('Tables') ? data.Tables : {};
    for (var i = 0; i < indexArr.length; i++) {
        for (var key in tables) {
            if (indexArr[i] == key) {
                var item = tables[key];
                item.hidden = item.Extra.HIDDENCOLS.split(',');
                item.List = [];
                if (item.Data && item.Data.length > 0) {
                    for (var obj in item.Data[0]) {
                        var info = {};
                        info.tit = obj;
                        info.content = item.Data[0][obj];
                        item.List.push(info);
                        for (var j = 0; j < item.hidden.length; j++) {
                            if (item.hidden[j] == obj) {
                                item.List.pop();
                            }
                        }
                    }
                }
                item.showType = true;
                state.syMemberInfo.push(item);
                break;
            }
        }
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
                    item.List = [];
                    if (item.Data && item.Data.length > 0) {
                        for (var obj in item.Data[0]) {
                            var info = {};
                            info.tit = obj;
                            info.content = item.Data[0][obj];
                            item.List.push(info);
                        }
                    }
                    item.showed = true;
                    state.memberInfo.push(item);
                    break;
                }
            }
        }
        console.log(state.memberInfo)
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
        console.log(state.ongoingAct);
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
        console.log(state.historyAct);
    }
}