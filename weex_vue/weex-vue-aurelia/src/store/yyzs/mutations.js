const modal = weex.requireModule('modal');
var storage = weex.requireModule('storage');

//
// //设置token
// export function SET_TOKEN(state, {token, callback}) {
//     state.selfToken = token;
//     if (callback) {
//         callback();
//     }
// }
// //设置 baseUrl
// export function SET_BASE_URL(state, {url}) {
//     state.baseUrl = url;
// }
// //设置 baseUrl
// export function SET_RATIO(state, {ratio}) {
//     state.ratio = ratio;
// }
// //设置 error
// export function SET_ERROR(state, {showType, mess}) {
//     // console.log(showType,state)//showType:0-不显示；1：请求成功-没有数据；2：请求失败-请求服务器失败；3：请求失败-刷新数据失败；4：正在请求-正在请求中的loading
//     if (showType == 0) {//请求数据成功后设置
//         state.base.errorInfo.errorMess = '';
//         state.base.errorInfo.errorImg = '';
//     } else if (showType == 1) {//页面中 computed 中获取数据时判断列表为空时设置
//         // state.errorInfo.errorImg='/drawable/no_data.png';
//         state.base.errorInfo.errorMess = mess;
//     } else if (showType == 4) {//初始进入新界面时设置 废弃（改为 refresh 组件）
//         state.base.errorInfo.errorMess = '加载中...';
//     } else {//请求失败后设置
//         // state.errorInfo.errorImg=showType==2?'/drawable/loading_404.png':'';
//         state.base.errorInfo.errorMess = mess;
//     }
//
// }

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
        this.dispatch('setError',  {showType: 1, mess: '暂无会员信息'});
    }
    // console.log(state.syMemberInfo)
}
/*------会员消费信息------*/
export function GET_SY_ORDER_DETAIL(state, {data}) {
    console.log(data);
    data={"Tables":{"2017\u5e7412\u6708\u8ba2\u5355\u660e\u7ec6":{"Name":"2017\u5e7412\u6708\u8ba2\u5355\u660e\u7ec6","Data":[{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"2.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"3.00"},{"\u5546\u54c1\u7f16\u53f7":"352459","\u5546\u54c1\u63cf\u8ff0":"84\u6d88\u6bd2\u6db2\/\u745e\u6cf0\u5947@500g","\u6570\u91cf":"2.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u74f6","\u9500\u552e\u5355\u4ef7":"2.00","\u96f6\u552e\u603b\u989d":"4.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-7.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"1.50"},{"\u5546\u54c1\u7f16\u53f7":"023685","\u5546\u54c1\u63cf\u8ff0":"\u5927\u67a3@\u7cbe\u9009200g","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u888b","\u9500\u552e\u5355\u4ef7":"15.80","\u96f6\u552e\u603b\u989d":"15.80"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-17.30","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-12.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"234042","\u5546\u54c1\u63cf\u8ff0":"\u7ea2\u725b\u7ef4\u751f\u7d20\u529f\u80fd\u996e\u6599@250ml","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u7f50","\u9500\u552e\u5355\u4ef7":"6.00","\u96f6\u552e\u603b\u989d":"6.00"},{"\u5546\u54c1\u7f16\u53f7":"234042","\u5546\u54c1\u63cf\u8ff0":"\u7ea2\u725b\u7ef4\u751f\u7d20\u529f\u80fd\u996e\u6599@250ml","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u7f50","\u9500\u552e\u5355\u4ef7":"6.00","\u96f6\u552e\u603b\u989d":"6.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-6.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"234042","\u5546\u54c1\u63cf\u8ff0":"\u7ea2\u725b\u7ef4\u751f\u7d20\u529f\u80fd\u996e\u6599@250ml","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u7f50","\u9500\u552e\u5355\u4ef7":"6.00","\u96f6\u552e\u603b\u989d":"6.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"1.50"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-1.50","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-3.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"1.50"},{"\u5546\u54c1\u7f16\u53f7":"350083","\u5546\u54c1\u63cf\u8ff0":"\u7f8e\u8299\u7279\u536b\u751f\u6e7f\u5dfe\uff08\u542f\u5c01\u88c5\uff09@10\u7247","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"1.50"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-6.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"4.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"6.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"5.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"7.50"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-7.50","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-63.60","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"350084","\u5546\u54c1\u63cf\u8ff0":"\u7f8e\u8299\u7279\u76d6\u88c5\u536b\u751f\u6e7f\u5dfe@80\u7247","\u6570\u91cf":"4.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"15.90","\u96f6\u552e\u603b\u989d":"63.60"},{"\u5546\u54c1\u7f16\u53f7":"352845","\u5546\u54c1\u63cf\u8ff0":"\u6e05\u98ce\u62bd\u53d6\u5f0f\u9762\u7eb8200\u62bd@200\u62bd*2\u5c42*3","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u7ec4","\u9500\u552e\u5355\u4ef7":"11.50","\u96f6\u552e\u603b\u989d":"11.50"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-11.50","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"368774","\u5546\u54c1\u63cf\u8ff0":"\u9686\u529b\u5947\u86c7\u80c6\u725b\u9ec4\u51dd\u9732@50ml","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u652f","\u9500\u552e\u5355\u4ef7":"12.80","\u96f6\u552e\u603b\u989d":"12.80"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"4.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"6.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-18.80","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-8.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"352459","\u5546\u54c1\u63cf\u8ff0":"84\u6d88\u6bd2\u6db2\/\u745e\u6cf0\u5947@500g","\u6570\u91cf":"4.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u74f6","\u9500\u552e\u5355\u4ef7":"2.00","\u96f6\u552e\u603b\u989d":"8.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-44.50","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"356073","\u5546\u54c1\u63cf\u8ff0":"\u65b9\u5757\u84dd\u6297\u83cc\u5168\u6548\u6d17\u8863\u6db2\uff08\u6e05\u65b0\u82b1\u9999\uff09@2L","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u74f6","\u9500\u552e\u5355\u4ef7":"39.00","\u96f6\u552e\u603b\u989d":"39.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"1.50"},{"\u5546\u54c1\u7f16\u53f7":"352459","\u5546\u54c1\u63cf\u8ff0":"84\u6d88\u6bd2\u6db2\/\u745e\u6cf0\u5947@500g","\u6570\u91cf":"2.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u74f6","\u9500\u552e\u5355\u4ef7":"2.00","\u96f6\u552e\u603b\u989d":"4.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-7.50","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"1.50"},{"\u5546\u54c1\u7f16\u53f7":"352459","\u5546\u54c1\u63cf\u8ff0":"84\u6d88\u6bd2\u6db2\/\u745e\u6cf0\u5947@500g","\u6570\u91cf":"3.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u74f6","\u9500\u552e\u5355\u4ef7":"2.00","\u96f6\u552e\u603b\u989d":"6.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"4.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"6.00"},{"\u5546\u54c1\u7f16\u53f7":"023685","\u5546\u54c1\u63cf\u8ff0":"\u5927\u67a3@\u7cbe\u9009200g","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u888b","\u9500\u552e\u5355\u4ef7":"15.80","\u96f6\u552e\u603b\u989d":"15.80"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-21.80","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-3.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"2.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"3.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-31.60","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"023685","\u5546\u54c1\u63cf\u8ff0":"\u5927\u67a3@\u7cbe\u9009200g","\u6570\u91cf":"2.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u888b","\u9500\u552e\u5355\u4ef7":"15.80","\u96f6\u552e\u603b\u989d":"31.60"},{"\u5546\u54c1\u7f16\u53f7":"331466","\u5546\u54c1\u63cf\u8ff0":"\u533b\u7528\u68c9\u7b7e@100\u652f","\u6570\u91cf":"2.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u5305","\u9500\u552e\u5355\u4ef7":"1.50","\u96f6\u552e\u603b\u989d":"3.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-3.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-39.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"356073","\u5546\u54c1\u63cf\u8ff0":"\u65b9\u5757\u84dd\u6297\u83cc\u5168\u6548\u6d17\u8863\u6db2\uff08\u6e05\u65b0\u82b1\u9999\uff09@2L","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u74f6","\u9500\u552e\u5355\u4ef7":"39.00","\u96f6\u552e\u603b\u989d":"39.00"},{"\u5546\u54c1\u7f16\u53f7":"352459","\u5546\u54c1\u63cf\u8ff0":"84\u6d88\u6bd2\u6db2\/\u745e\u6cf0\u5947@500g","\u6570\u91cf":"3.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u74f6","\u9500\u552e\u5355\u4ef7":"2.00","\u96f6\u552e\u603b\u989d":"6.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-6.00","\u96f6\u552e\u603b\u989d":"0.00"},{"\u5546\u54c1\u7f16\u53f7":"JFDH","\u5546\u54c1\u63cf\u8ff0":"\u79ef\u5206\u5151\u6362","\u6570\u91cf":"1.00","\u8ba2\u5355\u6570\u91cf\u5355\u4f4d":"\u4e2a","\u9500\u552e\u5355\u4ef7":"-3.50","\u96f6\u552e\u603b\u989d":"0.00"}],"Extra":{"COLSLINK":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","SHOWCOLS":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","TS_SUBTITLE":"\u6570\u91cf\uff1a{\u6570\u91cf}({\u8ba2\u5355\u6570\u91cf\u5355\u4f4d}) \u5355\u4ef7\uff1a{\u9500\u552e\u5355\u4ef7} \u603b\u989d\uff1a{\u96f6\u552e\u603b\u989d}","HIDDENCOLS":"","TS_TITLE":"{\u5546\u54c1\u63cf\u8ff0}({\u5546\u54c1\u7f16\u53f7})","SHOWTYPE":"TS","PRIMARYKEY":"","DATATYPE":"LIST","DESC":"2017\u5e7412\u6708\u8ba2\u5355\u660e\u7ec6"}},"2017\u5e7411\u6708\u8ba2\u5355\u660e\u7ec6":{"Name":"2017\u5e7411\u6708\u8ba2\u5355\u660e\u7ec6","Data":[],"Extra":{"COLSLINK":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","SHOWCOLS":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","TS_SUBTITLE":"\u6570\u91cf\uff1a{\u6570\u91cf}({\u8ba2\u5355\u6570\u91cf\u5355\u4f4d}) \u5355\u4ef7\uff1a{\u9500\u552e\u5355\u4ef7} \u603b\u989d\uff1a{\u96f6\u552e\u603b\u989d}","HIDDENCOLS":"","TS_TITLE":"{\u5546\u54c1\u63cf\u8ff0}({\u5546\u54c1\u7f16\u53f7})","SHOWTYPE":"TS","PRIMARYKEY":"","DATATYPE":"LIST","DESC":"2017\u5e7411\u6708\u8ba2\u5355\u660e\u7ec6"}},"2017\u5e7410\u6708\u8ba2\u5355\u660e\u7ec6":{"Name":"2017\u5e7410\u6708\u8ba2\u5355\u660e\u7ec6","Data":[],"Extra":{"COLSLINK":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","SHOWCOLS":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","TS_SUBTITLE":"\u6570\u91cf\uff1a{\u6570\u91cf}({\u8ba2\u5355\u6570\u91cf\u5355\u4f4d}) \u5355\u4ef7\uff1a{\u9500\u552e\u5355\u4ef7} \u603b\u989d\uff1a{\u96f6\u552e\u603b\u989d}","HIDDENCOLS":"","TS_TITLE":"{\u5546\u54c1\u63cf\u8ff0}({\u5546\u54c1\u7f16\u53f7})","SHOWTYPE":"TS","PRIMARYKEY":"","DATATYPE":"LIST","DESC":"2017\u5e7410\u6708\u8ba2\u5355\u660e\u7ec6"}},"2017\u5e7409\u6708\u8ba2\u5355\u660e\u7ec6":{"Name":"2017\u5e7409\u6708\u8ba2\u5355\u660e\u7ec6","Data":[],"Extra":{"COLSLINK":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","SHOWCOLS":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","TS_SUBTITLE":"\u6570\u91cf\uff1a{\u6570\u91cf}({\u8ba2\u5355\u6570\u91cf\u5355\u4f4d}) \u5355\u4ef7\uff1a{\u9500\u552e\u5355\u4ef7} \u603b\u989d\uff1a{\u96f6\u552e\u603b\u989d}","HIDDENCOLS":"","TS_TITLE":"{\u5546\u54c1\u63cf\u8ff0}({\u5546\u54c1\u7f16\u53f7})","SHOWTYPE":"TS","PRIMARYKEY":"","DATATYPE":"LIST","DESC":"2017\u5e7409\u6708\u8ba2\u5355\u660e\u7ec6"}},"2017\u5e7408\u6708\u8ba2\u5355\u660e\u7ec6":{"Name":"2017\u5e7408\u6708\u8ba2\u5355\u660e\u7ec6","Data":[],"Extra":{"COLSLINK":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","SHOWCOLS":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","TS_SUBTITLE":"\u6570\u91cf\uff1a{\u6570\u91cf}({\u8ba2\u5355\u6570\u91cf\u5355\u4f4d}) \u5355\u4ef7\uff1a{\u9500\u552e\u5355\u4ef7} \u603b\u989d\uff1a{\u96f6\u552e\u603b\u989d}","HIDDENCOLS":"","TS_TITLE":"{\u5546\u54c1\u63cf\u8ff0}({\u5546\u54c1\u7f16\u53f7})","SHOWTYPE":"TS","PRIMARYKEY":"","DATATYPE":"LIST","DESC":"2017\u5e7408\u6708\u8ba2\u5355\u660e\u7ec6"}},"2017\u5e7407\u6708\u8ba2\u5355\u660e\u7ec6":{"Name":"2017\u5e7407\u6708\u8ba2\u5355\u660e\u7ec6","Data":[],"Extra":{"COLSLINK":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","SHOWCOLS":"\u5546\u54c1\u7f16\u53f7,\u5546\u54c1\u63cf\u8ff0,\u6570\u91cf,\u8ba2\u5355\u6570\u91cf\u5355\u4f4d,\u9500\u552e\u5355\u4ef7,\u96f6\u552e\u603b\u989d","TS_SUBTITLE":"\u6570\u91cf\uff1a{\u6570\u91cf}({\u8ba2\u5355\u6570\u91cf\u5355\u4f4d}) \u5355\u4ef7\uff1a{\u9500\u552e\u5355\u4ef7} \u603b\u989d\uff1a{\u96f6\u552e\u603b\u989d}","HIDDENCOLS":"","TS_TITLE":"{\u5546\u54c1\u63cf\u8ff0}({\u5546\u54c1\u7f16\u53f7})","SHOWTYPE":"TS","PRIMARYKEY":"","DATATYPE":"LIST","DESC":"2017\u5e7407\u6708\u8ba2\u5355\u660e\u7ec6"}}},"Extras":{"TABLES_INDEX":"2017\u5e7412\u6708\u8ba2\u5355\u660e\u7ec6,2017\u5e7411\u6708\u8ba2\u5355\u660e\u7ec6,2017\u5e7410\u6708\u8ba2\u5355\u660e\u7ec6,2017\u5e7409\u6708\u8ba2\u5355\u660e\u7ec6,2017\u5e7408\u6708\u8ba2\u5355\u660e\u7ec6,2017\u5e7407\u6708\u8ba2\u5355\u660e\u7ec6"}};
    state.orderDetail = [];
    if(data.hasOwnProperty('Extras')){
        var index = data.Extras;
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
                        console.log(item.Data)
                        // for(var index=0;index<item.Data.length;i++) {
                        //     var goods = item.Data[index];
                        //     console.log(goods)
                        //     // for (var col = 0; col < colsLink.length; col++) {
                        //     //     for (var obj in goods) {
                        //     //         if (colsLink[col] == obj) {
                        //     //             var info = {};
                        //     //             info.tit = obj;
                        //     //             info.content = item.Data[0][obj];
                        //     //             item.List.push(info);
                        //     //         }
                        //     //     }
                        //     // }
                        // }
                        item.showed = true;
                        state.orderDetail.push(item);
                        break;
                    }
                }
            }
        }
        if (state.orderDetail.length < 1) {
            this.dispatch('setError',  {showType: 1, mess: '暂无会员消费信息'});
        }
    }else {
        var ret=data.DATA;
        this.dispatch('setError',  {showType: 1, mess: ret.hasOwnProperty('CODE')||ret.hasOwnProperty('MESSAGE')?ret.CODE+':'+ret.MESSAGE:'数据格式错误：不存在 Extras'});
    }
    // console.log(state.orderDetail)
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