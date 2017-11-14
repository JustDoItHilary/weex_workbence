const modal = weex.requireModule('modal');

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
        if(details[0].OPTIONGUID!=''){
            for(var i=0;i<data.OPTION.length;i++){
                if(details[0].OPTIONGUID==data.OPTION[i].GUID){
                    state.applyDetails.OPTIONIDNEX=i;
                }
            }
        }
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


//设置token
export function SET_TOKEN(state,{token}) {
    state.selfToken=token;
}
//设置 baseUrl
export function SET_BASE_URL(state, {url}) {
    state.baseUrl = url;
}
