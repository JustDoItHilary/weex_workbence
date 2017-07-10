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
export function SET_SLSJ_NEW(state, {data}) {
    var self = this;
    console.log(data)
    if (data) {
        // state.slsjNew=data.data
        for (var j = 0; j < data.data.length; j++) {
            var item = data.data[j];
            item.showed = false;
            if (item.data !== null && item.data.length > 0) {
                item.id = item.data[0].qid;
            }
            if (item.data !== null && item.data.length > 0) {
                for (var i = 0; i < item.data.length; i++) {
                    var ans = item.data[i];
                    ans.selected = 0;
                    ans.value = '';
                    if (state.slsjSpecial.aIndex === '' && ans.special == 1) {
                        state.slsjSpecial.aIndex = i - 1;
                        state.slsjSpecial.qIndex = j;
                    }
                    if (state.slsjSpecial.modelIndex === '' && ans.content !== '') {
                        state.slsjSpecial.modelIndex = i - 1;
                    }
                    if (ans.atype == 3) {
                        var arr = ans.aname.split('|&');
                        ans.aname = arr;
                    }
                }
                var closeItem = {atype: 7};
                item.data.push(closeItem);
            }
            state.slsjNew.push(item);
        }
    }
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
                item.summary = apis.replaceTransfer(item.summary);
                item.myPlan = apis.replaceTransfer(item.myPlan);
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
    if (data.length > 0) {
        state.applyDetails = data[0]
        state.applyReaderList.approveList = []
        state.applyReaderList.approveList.push({USERNAME: data[0].APPNAME})
        state.applyReaderList.noticeList = data[0].DATA
    } else {
        state.applyReaderList.approveList = []
        state.applyReaderList.noticeList = []
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
//设置新增申请的内容（解决添加成员后输入内容消失的问题）
export function SET_INPUT_VALUE(state,{value}) {
    state.applyInput=value;
}
//设置token
export function SET_TOKEN(state,{token}) {
    state.applyToken=token;
}
//设置 baseUrl
export function SET_APPLY_URL(state, {url}) {
    state.applyBaseUrl = url;
}
