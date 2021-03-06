/**
 * Created by aurelia on 17/3/14.
 */


// var stream = require('@weex-module/stream');//说是0.15已经支持,但是我没生效

var stream
__weex_define__('@weex-temp/api', function (__weex_require__) {
    stream = __weex_require__('@weex-module/stream')
});

var apiURL = {
    yiyaoUrl:'http://im.yiyao365.cn/',
    jsBaseurl: 'http://weex.yy365.cn/',
    // workRep:'workRep.js',
    // newRep:'newRep.js',
    // repDetails:'repDetails.js',
    // repCheckMembers:'repCheckMembers.js',
    // repCheckTimes:'repCheckTimes.js',
    repCheck:'repCheck.js',
    baseUrl:'http://daily.romens.cn/Handler/DailyAPIHandler.ashx?action=',
    // baseUrl:'http://192.168.100.117:8090/Handler/DailyAPIHandler.ashx?action=',
    getReports:'GetReports',
    uploadReports:'UploadReports',
    getReviewList:'GetReviewList',
    auditReport:'AuditReport',
    getEmpList:'GetEmpList',

};
function getData(url,body,callback,progresscallback){
    var options={method:'POST',url:url,type:'json',body:body};
    stream.fetch(options,function(ret){
        console.log('REPCALLBACK: ',ret);
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
exports.getUserPlatformCode=function(handleName,body,callback,progresscallback){
    getData(apiURL.yiyaoUrl+handleName,body,callback,progresscallback);
};
exports.getReports = function (body,callback,progresscallback) {
    getData(apiURL.baseUrl + apiURL.getReports,body, callback,progresscallback);
};
exports.uploadReports = function (body,callback,progresscallback) {
    getData(apiURL.baseUrl + apiURL.uploadReports, body,callback,progresscallback);
};
exports.getReviewList=function(body,callback,progresscallback){
    getData(apiURL.baseUrl+apiURL.getReviewList,body,callback,progresscallback);
}
exports.auditReport = function (body,callback,progresscallback) {
    getData(apiURL.baseUrl + apiURL.auditReport ,body, callback,progresscallback);
};
exports.getEmpList = function (body,callback,progresscallback) {
    getData(apiURL.baseUrl + apiURL.getEmpList ,body, callback,progresscallback);
};
exports.getBaseUrl=function(bundleUrl){
    bundleUrl=new String(bundleUrl);
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
    if (type=='yyy-MM-dd') {
        return formate_date;
    }else if (type=='yyy-MM-dd HH:mm:ss') {
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
    if (str.length == 0) return "";
    str=str.replace(/&amp;/g,'&');
    str=str.replace(/&lt;br\/&gt;/g,'\n');
    str=str.replace(/\r/g,'\n');
    str=str.replace(/&quot;/g,'"');
    str=str.replace(/&apos;/g,'\'');
    str=str.replace(/&lt;/g,'<');
    str=str.replace(/&gt;/g,'>');
    str=str.replace(/&nbsp;/g,' ');
    str=str.replace(/&amp;lt;br\/&amp;gt;/g,' ');
    str=str.replace(/&lowast;/g,'*');
    str=str.replace(/&minus;/g,'−');
    str=str.replace(/&sim;/g,'~');
    str=str.replace(/&iexcl;/g,'?');
    str=str.replace(/&brvbar;/g,'|');
    str=str.replace(/&laquo;/g,'?');
    str=str.replace(/&not;/g,'?');
    str=str.replace(/&reg;/g,'®');
    str=str.replace(/&deg;/g,'ˉ');
    str=str.replace(/&plusmn;/g,'±');
    str=str.replace(/&copy;/g,'©');
    str=str.replace(/&times;/g,'×');
    str=str.replace(/&divide;/g,'÷');
    str=str.replace(/&copy;/g,'©');
     // var s = "";
     //    if (str.length == 0) return "";
     //    // s = str.replace(/&amp;/g, "&");
     //    s = str.replace(/&lt;/g, "<");
     //    s = s.replace(/&gt;/g, ">");
     //    // s = s.replace(/''/g, "'");
     //    // s = s.replace(/&#39;/, "\\\'");
     //    s = s.replace(/&quot;/g, "\"");
     //    //s = s.replace(/\"/g, "/&quot;");
     //    s = s.replace(/&lt;br\/&gt;/g, "\\n");
     //    s = s.replace(/\//g, "\\");
     //    s = s.replace(/    /g, "\\t");
     //    // s = s.replace(//g, "");
     //    // s = s.replace(/ /g, "\u000B");
    return str;
};
exports.escapeHtml=function(str) {
    if (str.length == 0) return "";
    str=str.replace(/\n/g,'\\r');
    // str=str.replace(/\n/g,'&lt;br\/&gt;');
    // str=str.replace(/"/g,'&quot;');
    str=str.replace(/'/g,'\\r');
    str=str.replace(/&/g,'\\r');
    // str=str.replace(/&/g,'&amp;');
    // str=str.replace(/</g,'&lt;');
    // str=str.replace(/>/g,'&gt;');
    str=str.replace(/ /g,'\\r');
    // str=str.replace(/&amp;lt;br\/&amp;gt;/g,'&lt;br\/&gt;');
        //  var s = "";
        // // s = str.replace(/&amp;/g, "&");
        // s = str.replace(/</g, "&lt;");
        // s = s.replace(/>/g, "&gt;");
        str = str.replace(/'/g, "\\r");
        // // s = s.replace(/&#39;/, "\\\'");
        str = str.replace(/"/g, "\\r");
        // //s = s.replace(/\"/g, "/&quot;");
        // s = s.replace(/\\n/g, "&lt;br\/&gt;");
        // s = s.replace(/\\/g, "/");
        // // s = s.replace(/\\/g, "/");
        // s = s.replace(/\\sssst/g, "    ");
        // // s = s.replace(/\u0008/g, "");
        // s = s.replace(/\\u0009/g, "    ");
        // s = s.replace(/\\u000A/g, "&lt;br\/&gt;");
        // // s = s.replace(/\u000B/g, " ");
        // s = s.replace(/\\u000B/g, " ");
        // s = s.replace(/\\u000C/g, " ");
        // s = s.replace(/\\u000D/g, "&lt;br\/&gt;");
        return str;
    };
// exports.getWorkRep = function () {
//     return apiURL.jsBaseurl + apiURL.workRep ;
// };
// exports.newRep = function () {
//     return apiURL.jsBaseurl + apiURL.newRep;
// };
// exports.getRepDetails = function () {
//     return apiURL.jsBaseurl + apiURL.repDetails;
// };
// exports.getRepCheckMembers = function  {
//     return apiURL.jsBaseurl + apiURL.repCheckMembers;
// };
// exports.getRepCheckTimes = function () {
//     return apiURL.jsBaseurl + apiURL.repCheckTimes;
// };
// exports.getRepCheck = function () {
//     return apiURL.jsBaseurl+apiURL.repCheck;
// };
// exports.getBaseUrl = function (bundleUrl, isnav) {
//     bundleUrl = new String(bundleUrl);
//     var nativeBase;
//     var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;

//     var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
//     if (isAndroidAssets) {
//         nativeBase = 'file://assets/dist/';
//     }
//     else if (isiOSAssets) {
//         nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
//     }
//     else {
//         var host = 'localhost:12580';
//         var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
//         if (matches && matches.length >= 2) {
//             host = matches[1];
//         }

//         //此处需注意一下,tabbar 用的直接是jsbundle 的路径,但是navigator是直接跳转到新页面上的.
//         if (typeof window === 'object') {
//             nativeBase = isnav ? 'http://' + host + '/index.html?page=./dist/' : '/dist/';
//         } else {
//             nativeBase = 'http://' + host + '/dist/';
//         }
//     }

//     return nativeBase;
// };