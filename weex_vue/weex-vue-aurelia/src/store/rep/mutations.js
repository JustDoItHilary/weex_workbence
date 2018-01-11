const modal = weex.requireModule('modal');

import {
    replaceTransfer, sortList
} from '../../mixins'


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
    if (state.reviewList.length < 1) {
        this.dispatch('setError', {showType: 1, mess: '暂无待审核'});
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
    // 从列表中去除 管理员，冯张龙，赵九州，赵兴庭 的数据；
    var unShowedList=["E296606E-C816-4DF3-B23B-E8831A289E84","f8f3398735d54c53be296f69e33792ee","9ec37a7eb7f44cd5b07833661ea3c093","746f094512b347ecaba7918b2a849f40"];
    state.repStatistics=[];
    if (retdata.length > 0) {
        for (var i = 0; i < retdata.length; i++) {
            for(var j=0;j<unShowedList.length;j++){
                if (retdata[i].guid == unShowedList[j]) {
                    retdata.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        state.repStatistics = retdata;
    }
    // console.log(state.repStatistics)
}
export function SET_REP_FIRST_SELECTED(state, {selected}) {
    state.isSelected = selected;
}

