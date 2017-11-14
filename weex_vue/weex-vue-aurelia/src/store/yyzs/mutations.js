const modal = weex.requireModule('modal');
var storage = weex.requireModule('storage');


/** -----------------SY------------------*/
export function GET_SY_MEMBERINFO(state,{data}) {
    if(data!=null&&data.DETAIL!=null&&data.DETAIL.length>0){
        state.syMemberInfo=[];
        for(let i=0;i<data.DETAIL.length;i++){
            let item=data.DETAIL[i];
            let arr=[];
            for(let j in item.LIST){
                let obj={};
                obj.TIT=j;
                obj.CONTENT=item.LIST[j];
                arr.push(obj)
            }
            item.INFO=arr;
            item.showed=true;
            state.syMemberInfo.push(item)
        }
    }
}

export function SET_MEMBER_OPERATOR(state,{data}) {
    if(data!=null){
        if(data.hasOwnProperty('DATA')&&data.DATA.length>0){
            state.memberOperatorList=data.DATA;
        }
        if (data.hasOwnProperty('CODE')){
            state.memberOperatorCode=data.CODE;
        }
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
//设置 token
export function SET_ACCESS_TOKEN(state,{data,callback}) {
    var tokens={};
    tokens.accessToken=data.access_token;
    tokens.refreshToken=data.refresh_token;
    tokens.tokenType=data.token_type;
    tokens.expiresIn=data.expires_in;
    tokens.saveTime=Date.parse(new Date());
    storage.setItem("sy_token",tokens,function (e) {
        console.log(e,state.tokens);
        if(e.result=="success"){
            callback(true);
        }else {
            modal.toast({message:"存储 token 失败!",doation:0.3});
            callback(false);
        }
    });
}
export function SET_TOKEN_SAVETIME(state,{time}) {
    state.tokens.saveTime=time;
}