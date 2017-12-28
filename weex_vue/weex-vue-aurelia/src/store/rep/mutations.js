const modal = weex.requireModule('modal');

import {
    replaceTransfer, sortList
} from '../../mixins'

// //设置token
// export function SET_TOKEN(state, {token}) {
//     state.selfToken = token;
// }
// //设置 baseUrl
// export function SET_BASE_URL(state, {url}) {
//     state.baseUrl = url;
// }
// //设置 不同平台的放大倍数
// export function SET_RATIO(state, {ratio}) {
//     state.ratio = ratio;
// }
// //设置 error
// export function SET_ERROR(state, {showType, mess}) {
//     // console.log(showType)//showType:0-不显示；1：请求成功-没有数据；2：请求失败-请求服务器失败；3：请求失败-刷新数据失败；4：正在请求-正在请求中的loading
//     if (showType == 0) {//请求数据成功后设置
//         state.errorInfo.errorMess = '';
//         state.errorInfo.errorImg = '';
//     } else if (showType == 1) {//页面中 computed 中获取数据时判断列表为空时设置
//         // state.errorInfo.errorImg='/drawable/no_data.png';
//         state.errorInfo.errorMess = mess;
//     } else if (showType == 4) {//初始进入新界面时设置 废弃（改为 refresh 组件）
//         state.errorInfo.errorMess = '加载中...';
//     } else {//请求失败后设置
//         // state.errorInfo.errorImg=showType==2?'/drawable/loading_404.png':'';
//         state.errorInfo.errorMess = mess;
//     }
//
// }

/** -----------------REP------------------*/
export function SET_USERPLATFORMCODE(state, {retdata, callback}) {
    if (retdata != null) {
        state.userPlatformCode = retdata.USERPLATFORMCODE;
        callback(retdata.USERPLATFORMCODE);
    } else {
        state.userPlatformCode = '';
        modal.toast({'message': '获取大平台账号失败', 'doation': 1});
    }
}
//设置工作汇报列表
export function SET_REP_LIST(state, {retdata, callback}) {
    state.repList = [];
    if (retdata != null && retdata.length > 0) {
        // console.log('REPCALLBACK-getList: ',JSON.stringify(retdata));
        for (var i = 0; i < retdata.length; i++) {
            var item = retdata[i];
            item.added = true;
            item.sortTime = new Date(Date.parse(item.UpdateTime));
            item.year = item.sortTime.getFullYear();
            item.month = item.sortTime.getMonth() + 1;
            for (var j = 0; j < state.repList.length; j++) {
                var oldItem = state.repList[j];
                if (item.startTime == oldItem.startTime || item.endTime == oldItem.endTime) {
                    if (item.sortTime >= oldItem.sortTime) {
                        state.repList.splice(j, 1);
                    }
                    break;
                }
            }
            if (item.added) {
                // item.type=2;
                if (item.IsPost == 1) {
                    item.checked = '已提交';
                    item.IsPost = true;
                } else {
                    item.IsPost = false;
                    item.checked = '未提交';
                }
                item.summary = replaceTransfer(item.summary);
                item.myPlan = replaceTransfer(item.myPlan);
                state.repList.push(item);
            }
        }
        sortList('sortTime', state.repList);//排序
    } else {
        callback();
    }
    // self.repList.reverse();//直接倒叙
    // state.repList.push({type:3,tit:'没有更多了哦~',time:''});
}

//获取审核人员列表
export function SET_REP_EMP(state, {data}) {
    state.empList = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        item.selected = false;
        for (var j = 0; j < state.readerList.length; j++) {
            var other = state.readerList[j];
            // 从服务器获取到的数据属性为：Guid,
            // 从内存中获取到的选中数据属性为：guid
            if (other.guid == item.Guid) {
                item.selected = true;
                break;
            }
        }
        if (item.Name.length > 0) {
            item.fir = item.Name.slice(0, 1);
        }
        state.empList.push(item);
    }
}
export function SET_REP_REVIEW(state, {retdata}) {
    state.reviewList = [];
    if (retdata != null) {
        for (var i = 0; i < retdata.length; i++) {
            var item = retdata[i];
            if (item.Name.length > 0) {
                item.fir = item.Name.slice(0, 1);
            }
            state.reviewList.push(item);
        }
    } else {
        modal.toast({'message': '没有待审核信息~', 'doation': 1});
    }
}
export function SET_REP_ALL_AUDITED(state, {retdata}) {
    // console.log(JSON.stringify(retdata))
    state.reviewList=[];
    if (retdata && retdata.length > 0) {
        var data = retdata[0];
        var table1 = data.table1 ? data.table1 : [];
        var table2 = data.table2 ? data.table2 : [];
        for (var i = 0; i < table1.length; i++) {
            table1[i].isAudited = false;
            for (var j = 0; j < table2.length; j++) {
                if (table1[i].Guid == table2[j].Guid) {
                    table1[i].isAudited = true;
                    break;
                }
            }
        }
        state.reviewList = table1;
    }
}
//设置 repDetails
export function SET_REP_DETAILS(state, {item}) {
    item.repSum = item.summary;
    item.repPlan = item.myPlan;
    state.repDetails = item;
}
//设置上周 repDetails
export function SET_REP_LAST_DETAILS(state, {item}) {
    state.lastWeekRepDetails = item;
}
export function GET_READER(state, {auditors}) {
    state.readerList = [];
    var arr = auditors.split(',,');
    for (var str of arr) {
        if (str !== null && str !== "") {
            var headerArr = str.split('/*/');
            var item = {};
            item.Guid = headerArr[0];
            item.Name = headerArr[1];
            item.Code = headerArr[2];
            state.readerList.push(item);
        }
    }
}
export function SET_REP_LAST_NFNUM(state, {retdata}) {
    // console.log(retdata);
    if (retdata.length > 0 && retdata[0].counts) {
        state.lastNFNum = retdata[0].counts;
    }
}
export function SET_REP_ASSESSMENT(state, {retdata}) {
    state.assessment = retdata;
}
export function SET_REP_STATISTICS(state, {retdata}) {
    // console.log(retdata)
    state.repStatistics=[];
    if (retdata.length > 0) {
        for (var i = 0; i < retdata.length; i++) {
            if (retdata[i].code == 'Administrator') {
                retdata.splice(i, 1);
                break;
            }
        }
        state.repStatistics = retdata;
    }
}
export function SET_REP_FIRST_SELECTED(state, {selected}) {
    state.isSelected = selected;
}

