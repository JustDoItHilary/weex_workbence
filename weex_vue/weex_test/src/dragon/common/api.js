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
    getBlackFile:'http://slsj.yy365.cn/Resource/getFileTemplate',
    getFile:'http://slsj.yy365.cn/Contact',
    sendUrl:'http://slsj.yy365.cn/Contact',
    // Url:'http://192.168.100.140:8080/slsjDoctor/Drug',


};
function getData(url,body,callback,progresscallback){
    var options={method:'POST',url:url,type:'json',body:body};
    console.log('body: ',body);
    stream.fetch(options,function(ret){
        console.log('ret: ',ret);
        if (ret.ok) {
            callback(ret.data);
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
exports.getBlackFile=function(callback,progresscallback){
    getDataInGet(apiURL.getBlackFile,callback,progresscallback);
};
exports.getFile=function(body,callback,progresscallback){
    getData(apiURL.getFile,body,callback,progresscallback);
};
exports.sendInfo=function(body,callback,progresscallback){
    getData(apiURL.sendUrl,body,callback,progresscallback);
};
exports.getJSBaseUrl=function(){
    return apiURL.jsBaseurl;
};
exports.getUserPlatformCode=function(handleName,body,callback,progresscallback){
    getData(apiURL.yiyaoUrl+handleName,body,callback,progresscallback);
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