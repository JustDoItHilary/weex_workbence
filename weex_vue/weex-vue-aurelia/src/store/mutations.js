const modal = weex.requireModule('modal');

export function SET_ACTIVE_TYPE(state, {type}) {
    state.activeType = type
}

export function SET_LIST(state, {type, ids}) {
    state.lists[type] = ids
}

export function SET_ITEMS(state, {items}) {
    items.forEach(item => {
        if (item) {
            Vue.set(state.items, item.id, item)
        }
    })
}

export function SET_USER(state, {user}) {
    Vue.set(state.users, user.id, user)
}

/** -----------------notice------------------*/
export function SET_NOTICES(state, {items}) {
    var self = this;
    if (items) {
        items.forEach(item => {
            if (item) {
                var web_url = item.web_url;
                if (!web_url) {
                    var bundleUrl = weex.config.bundleUrl;
                    // var bundleUrl='http://weex.yy365.cn/my-list.js';
                    web_url = bundleUrl.split('/').slice(0, -1).join('/') + '/notice-item.js';
                }
                item.web_url = web_url;
                state.noticelist.push(item)
            }
        })
    } else {
        items = [{
            "AUTHOR": "冯张龙",
            "COVER": "http://files.yunuo365.com/images/GZ201704121413381491977618.png",
            "CREATEDATE": "2017-04-12 14:13:38",
            "DESC": "测试下",
            "GUID": "58edc59264e881491977618",
            "ISSUEDATE": "2017-04-12 14:13:38",
            "TITLE": "测试最新数据",
            "URL": "http://im.yiyao365.cn/Appnotice?GUID=58edc59264e881491977618"
        }];
        items.forEach(item => {
            if (item) {
                var web_url = item.web_url;
                if (!web_url) {
                    var bundleUrl = weex.config.bundleUrl;
                    // var bundleUrl='http://weex.yy365.cn/my-list.js';
                    web_url = bundleUrl.split('/').slice(0, -1).join('/') + '/notice-item.js';
                }
                item.web_url = web_url;
                state.noticelist.push(item)
            }
        })
    }
}

export function SET_NOTICEITEM(state, {item}) {
    var self = this;
    if (item) {
        state.noticeItem = item;
    } else {
        state.noticeItem = {
            "AUTHOR": "冯张龙",
            "COVER": "http://files.yunuo365.com/images/GZ201704121413381491977618.png",
            "CREATEDATE": "2017-04-12 14:13:38",
            "DESC": "测试下",
            "GUID": "58edc59264e881491977618",
            "ISSUEDATE": "2017-04-12 14:13:38",
            "TITLE": "测试最新数据",
            "URL": "http://im.yiyao365.cn/Appnotice?GUID=58edc59264e881491977618"
        };
    }
}

/** -----------------slsj------------------*/
export function SET_SLSJ_LIST(state, {data}) {
    if (data !== null && data.length > 0) {
        for (let j = 0; j < data.length; j++) {
            let item = data[j];
            item.showed = false;//showed - 是否展开
            item.warning=false;// warning - 是否显示 （必选）
            if (item.data !== null && item.data.length > 0) {
                item.id = item.data[0].qid;
            }
            if (item.data !== null && item.data.length > 0) {
                for (let i = 0; i < item.data.length; i++) {
                    let ans = item.data[i];
                    ans.value = '';
                }
                let closeItem = {atype: 7};
                item.data.push(closeItem);
            }
            state.slsjList.push(item);
        }
    }
}
export function SET_SLSJ_ITEM(state, {item,index}) {
    state.slsjList[index]=item;
}

/** -----------------REP------------------*/
export function SET_REPS(state, {retdata}) {
    let self = this;
    if (retdata != null && retdata.length > 0) {
        for (let i = 0; i < retdata.length; i++) {
            let item = retdata[i];
            item.added = true;
            item.sortTime = new Date(Date.parse(item.UpdateTime));
            for (let j = 0; j < state.repList.length; j++) {
                let oldItem = state.repList[j];
                if (item.startTime == oldItem.startTime || item.endTime == oldItem.endTime) {
                    if (item.sortTime >= oldItem.sortTime) {
                        state.repList.splice(j, 1);
                    }
                    break;
                }
            }
            if (item.added) {
                item.type = 2;
                if (item.IsPost == 1) {
                    item.checked = '已提交';
                    item.IsPost = true;
                } else {
                    item.IsPost = false;
                    item.checked = '未提交';
                }
                // item.summary = apis.replaceTransfer(item.summary);
                // item.myPlan = apis.replaceTransfer(item.myPlan);
                state.repList.push(item);
            }
        }
    }
    self.sortList('sortTime', state.repList);//排序
    // self.repList.reverse();//直接倒叙
    state.repList.push({type: 3, tit: '没有更多了哦~', time: ''});
}

/** -----------------APPLY------------------*/
//获取申请类型列表
export function GET_APPLY_TYPE(state, {data}) {
    state.applyTypes = data
}
//获取申请列表（不同类型申请）
export function GET_APPLY(state, {data}) {
    state.applyLists = data
}
//获取申请详情
export function GET_APPLY_DETAILS(state, {data}) {
    let details=data.DATA;
    if (details.length > 0) {
        state.applyDetails = details[0];
        state.applyDetails.OPTION=data.OPTION;
        state.applyReaderList.approveList = [];
        state.applyReaderList.approveList.push({USERNAME: details[0].APPNAME});
        state.applyReaderList.noticeList = details[0].DATA
    } else {
        state.applyReaderList.approveList = [];
        state.applyReaderList.noticeList = [];
        state.applyDetails = {}
    }
}
//获取所有人员列表
export function GET_APPLY_READER(state, {data}) {
    if (data.length > 0) {
        state.applyMemberLists = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.USERNAME.length > 0) {
                item.fir = item.USERNAME.slice(0, 1);
            }
            state.applyMemberLists.push(item);
        }
    }
}
//设置添加的审批者，知会者
export function SET_READER(state, {type, reader}) {
    // state.applyReaderList.approveList=reader;
    // modal.alert({message:JSON.stringify(reader),duration:1})
    if (type == 0) {
        state.applyReaderList.approveList = reader;
    } else {
        state.applyReaderList.noticeList = reader;
    }
}
// //设置token
// export function SET_TOKEN(state,{token}) {
//     state.selfToken=token;
// }
// //设置 baseUrl
// export function SET_BASE_URL(state, {url}) {
//     state.baseUrl = url;
// }

// /** --------------废弃---SY 会员信息------------------*/
// export function GET_SY_MEMBERINFO(state,{data}) {
//     if(data!=null&&data.DETAIL!=null&&data.DETAIL.length>0){
//         for(let i=0;i<data.DETAIL.length;i++){
//             let item=data.DETAIL[i];
//             let arr=[];
//             for(let j in item.LIST){
//                 let obj={};
//                 obj.TIT=j;
//                 obj.CONTENT=item.LIST[j];
//                 arr.push(obj)
//             }
//             item.INFO=arr;
//             item.showed=true;
//             state.syMemberInfo.push(item)
//         }
//     }
// }