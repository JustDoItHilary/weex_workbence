/**
 * Created by aurelia on 17/3/14.
 */


// var stream = require('@weex-module/stream');//说是0.15已经支持,但是我没生效
const stream =weex.requireModule('stream')
// var stream
// __weex_define__('@weex-temp/api', function (__weex_require__) {
//     stream = __weex_require__('@weex-module/stream')
// });

var apiURL = {
    yiyaoUrl:'http://im.yiyao365.cn/handle',
    jsBaseurl: 'http://weex.yy365.cn/',
    slsjBaseUrl:'http://slsj.yy365.cn/',
    repBaseUrl:'http://daily.romens.cn/Handler/DailyAPIHandler.ashx?action=',
    // repBaseUrl:'http://192.168.100.117:8090/Handler/DailyAPIHandler.ashx?action=',

    getReports:'GetReports',
    uploadReports:'UploadReports',
    deleteReports:'DeleteReports',
    getReviewList:'GetReviewList',
    auditReport:'AuditReport',
    getEmpList:'GetEmpList',
    savereportForJson:'SaveReport_Json',
    slsjGetFileTemplate:'http://slsj.yy365.cn/Resource/getFileTemplate',
    // slsjGetFileTemplate:'/getFileTemplate',
    slsjEditFile:'http://slsj.yy365.cn/Contact'


};
function getData(url,body,callback,progresscallback){
    // var header={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json;charset=UTF-8'
    //   };
    var options={method:'POST',url:url,type:'json',body:body};
    stream.fetch(options,function(ret){
        // modal.alert({'message':JSON.stringify(ret),'oktitle':'OK'});
        // require('@weex-module/myModule').printLog('ret: '+JSON.stringify(ret));
        console.log('REPCALLBACK: ',ret);
        if (ret.ok) {
            if (ret.data!==null) {
                callback(ret.data);
            }
        }
    },function(progress){
        progresscallback(progress);
    });
}
function getDataInGet(url,callback,progresscallback){
    var options={method:'GET',url:url,type:'json'};
    stream.fetch(options,function(ret){
        console.log('ret: ',ret);
        if (ret.ok) {
            callback(ret.data);
        }
    },function(progress){
        progresscallback(progress);
    });
}
function formatTime(time){
    if (time<10) {
        time='0'+time;
    }
    return time;
}
exports.getJSBaseUrl=function(){
    return apiURL.jsBaseurl;
};

/*rep*/
exports.getUserPlatformCode=function(handleName,body,callback,progresscallback){
    getData(apiURL.yiyaoUrl+handleName,body,callback,progresscallback);
};
exports.getReports = function (body,callback,progresscallback) {
    getData(apiURL.repBaseUrl + apiURL.getReports,body, callback,progresscallback);
};
exports.uploadReports = function (body,callback,progresscallback) {
    getData(apiURL.repBaseUrl + apiURL.uploadReports, body,callback,progresscallback);
};
exports.savereportForJson = function (body,callback,progresscallback) {
    getData(apiURL.repBaseUrl + apiURL.savereportForJson, body,callback,progresscallback);
};
exports.getReviewList=function(body,callback,progresscallback){
    getData(apiURL.repBaseUrl+apiURL.getReviewList,body,callback,progresscallback);
};
exports.auditReport = function (body,callback,progresscallback) {
    getData(apiURL.repBaseUrl + apiURL.auditReport ,body, callback,progresscallback);
};
exports.getEmpList = function (body,callback,progresscallback) {
    getData(apiURL.repBaseUrl + apiURL.getEmpList ,body, callback,progresscallback);
};

/*slsj*/
exports.getBlackFile=function(callback,progresscallback){
    getDataInGet(apiURL.slsjGetFileTemplate,callback,progresscallback);
};
exports.getFile=function(body,callback,progresscallback){
    getData(apiURL.slsjEditFile,body,callback,progresscallback);
};
exports.sendInfo=function(body,callback,progresscallback){
    getData(apiURL.slsjEditFile,body,callback,progresscallback);
};

/*notice*/
exports.noticeList=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.noticeDetails=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.noticeToRead=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};


/*apply*/
exports.apply=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.applyType=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.applyList=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.applyAdd=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.applyDetails=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.applyAddApprover=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.applyComplete=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.applyExceptList=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};
exports.applyExcept=function(body,callback,progresscallback){
    getData(apiURL.yiyaoUrl,body,callback,progresscallback);
};


exports.getBaseUrl=function(bundleUrl){
    // bundleUrl=new String(bundleUrl);
    var nativeBase;
    nativeBase=bundleUrl.split('/').slice(0,-1).join('/');
    return nativeBase;
};
exports.getWEHeight=function(params){
    // var ratio = this.$getConfig().env.deviceWidth / 750;
    var ratio=params.width/750;
    var height = params.height / ratio ;
    return height;
};
//格式化日期：yyyy-MM-dd
exports.formatDate=function(date,type){
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    var myhour=date.getHours();
    var myminute=date.getMinutes();
    var mysecond=date.getSeconds();
    var formate_date=formatTime(myyear)
            + "-" + formatTime(mymonth)
            + "-" + formatTime(myweekday);
    if (type=='yyyy-MM-dd') {
        return formate_date;
    }else if (type=='yyyy-MM-dd HH:mm:ss') {
        var formate_time=formatTime(myhour)
            +":"+ formatTime(myminute)
            +":"+ formatTime(mysecond);
        return (formate_date+" "+formate_time );
    }
};
exports.sortList=function(sortBy, list) {
    return list.sort(function(a, b) {
        // 降序，若需要升序则互换两者位置
        var s=b[sortBy] - a[sortBy];
        // console.log('REPCALLBACK: ',s);
        return s;
    });
};
exports.replaceTransfer=function(str){
    if (str.length === 0) return "";
    str=str.replace(/§§/g,'&');
    // str=str.replace(/§/g,'+');
    str=str.replace(/&amp;/g,'&');
    str=str.replace(/  /g,'\t');
    str=str.replace(/&lt;br\/&gt;/g,'\n');
    str=str.replace(/&quot;/g,'"');
    str=str.replace(/&apos;/g,'\'');
    str=str.replace(/&lt;/g,'<');
    str=str.replace(/&gt;/g,'>');
    // str=str.replace(/\//g,'\\');
    // str=str.replace(/\\/g,'&#39;');
    str=str.replace(/&nbsp;/g,' ');
    str=str.replace(/&minus;/g,'−');
    // str=str.replace(/&sim;/g,'~');
    str=str.replace(/&iexcl;/g,'?');
    str=str.replace(/&brvbar;/g,'|');
    str=str.replace(/&laquo;/g,'?');
    str=str.replace(/&not;/g,'?');
    str=str.replace(/&reg;/g,'®');
    // str=str.replace(/&deg;/g,'ˉ');
    // str=str.replace(/&plusmn;/g,'±');
    // str=str.replace(/&copy;/g,'©');
    // str=str.replace(/&times;/g,'×');
    // str=str.replace(/&divide;/g,'÷');
    // str=str.replace(/&copy;/g,'©');
    return str;
};
exports.escapeHtml=function(str) {
    if (str.length === 0) return "";
    str =str.replace(/"/g,"&quot;");
    str =str.replace(/'/g, "''");
    str =str.replace(/</g,"&lt;");
    str =str.replace(/>/g,"&gt;");
    // str =str.replace(/ /g,"&nbsp;");
    str = str.replace(/\\/g, "/");
    str = str.replace(/\t/g, "    ");
    str =str.replace(/\n/g,"&lt;br\/&gt;");
    str = str.replace(/\u0008/g, "");
    str = str.replace(/\u0009/g, "    ");
    str = str.replace(/\u000A/g, "&lt;br\/&gt;");
    str = str.replace(/\u000B/g, " ");
    str = str.replace(/\u000C/g, " ");
    str = str.replace(/\u000D/g, "&lt;br\/&gt;");
    str=str.replace(/§0§/g,'*');
    str=str.replace(/§1§/g,'#');
    str=str.replace(/§2§/g,'[');
    str=str.replace(/§3§/g,']');
    str=str.replace(/§4§/g,'{');
    str=str.replace(/§5§/g,'}'); // 手机端提交时包含的 * 提交后会去掉
    str = str.replace(/&/g, "§§"); //因为参数放于 json 对象中，所以不能包含 &
    // str = str.replace(/-/g, "&minus;");//不需要转义
    // str = str.replace(/~/g, "&sim;");//不需要转义
    // str = str.replace(/\?/g, "&iexcl;");//不需要转义
    // str = str.replace(/\|/g, "&brvbar;");//不需要转义
    // 不能包含 [] {} ,但是未进行转义，在以后需要时再进行转义
    return str;
};
  exports.deleteReports = function(body,callback,progresscallback) {
    getData(apiURL.repBaseUrl + apiURL.deleteReports,body,callback,progresscallback);
  };