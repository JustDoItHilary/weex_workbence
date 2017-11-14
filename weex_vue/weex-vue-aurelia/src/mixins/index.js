const modal = weex.requireModule('modal');
export default {
    methods: {
        toToast(mess){
            modal.toast({message: mess, duration: 0.3});
        },
        toAlert(mess,oktit,callback){
            modal.alert({message:mess,okTitle:oktit?oktit:'OK'},callback)
        },
        jump (to) {
            if (this.$router) {
                this.$router.push(to)
            }
        },
        back(){
            if (this.$router) {
                this.$router.go(-1)
            }
        },
        //格式化日期：yyyy-MM-dd
        formatDate(date, type) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();
            var myhour = date.getHours();
            var myminute = date.getMinutes();
            var mysecond = date.getSeconds();
            var formate_date = this.formatTime(myyear)
                + "-" + this.formatTime(mymonth)
                + "-" + this.formatTime(myweekday);
            if (type == 'yyyy-MM-dd') {
                return formate_date;
            } else if (type == 'yyyy-MM-dd HH:mm:ss') {
                var formate_time = this.formatTime(myhour)
                    + ":" + this.formatTime(myminute)
                    + ":" + this.formatTime(mysecond);
                return (formate_date + " " + formate_time );
            }
        },
        sortList(sortBy, list) {
            return list.sort(function (a, b) {
                // 降序，若需要升序则互换两者位置
                var s = b[sortBy] - a[sortBy];
                // console.log('REPCALLBACK: ',s);
                return s;
            });
        },
        formatTime(time){
            if (time < 10) {
                time = '0' + time;
            }
            return time;
        },
        replaceTransfer: function (str) {
            if (str.length === 0) return "";
            str = str.replace(/§§/g, '&');
            str = str.replace(/§/g, '+');
            str = str.replace(/&amp;/g, '&');
            str = str.replace(/  /g, '\t');
            str = str.replace(/&lt;br\/&gt;/g, '\n');
            str = str.replace(/&quot;/g, '"');
            str = str.replace(/&apos;/g, '\'');
            str = str.replace(/&lt;/g, '<');
            str = str.replace(/&gt;/g, '>');
            str = str.replace(/\//g, '\\');
            str = str.replace(/\\/g, '&#39;');
            str = str.replace(/&nbsp;/g, ' ');
            str = str.replace(/&lowast;/g, '*');
            str = str.replace(/&minus;/g, '−');
            str = str.replace(/&sim;/g, '~');
            str = str.replace(/&iexcl;/g, '?');
            str = str.replace(/&brvbar;/g, '|');
            str = str.replace(/&laquo;/g, '?');
            str = str.replace(/&not;/g, '?');
            // str=str.replace(/&reg;/g,'®');
            // str=str.replace(/&deg;/g,'ˉ');
            // str=str.replace(/&plusmn;/g,'±');
            // str=str.replace(/&copy;/g,'©');
            // str=str.replace(/&times;/g,'×');
            // str=str.replace(/&divide;/g,'÷');
            // str=str.replace(/&copy;/g,'©');
            return str;
        },
        escapeHtml: function (str) {
            if (str.length === 0) return "";
            str = str.replace(/"/g, "&quot;");
            str = str.replace(/'/g, "''");
            str = str.replace(/</g, "&lt;");
            str = str.replace(/>/g, "&gt;");
            // str =str.replace(/ /g,"&nbsp;");
            str = str.replace(/\\/g, "/");
            str = str.replace(/\t/g, "    ");
            str = str.replace(/\n/g, "&lt;br\/&gt;");
            str = str.replace(/\u0008/g, "");
            str = str.replace(/\u0009/g, "    ");
            str = str.replace(/\u000A/g, "&lt;br\/&gt;");
            str = str.replace(/\u000B/g, " ");
            str = str.replace(/\u000C/g, " ");
            str = str.replace(/\u000D/g, "&lt;br\/&gt;");
            // str = str.replace(/\*/g, "&lowast;"); // 手机端提交时包含的 * 提交后会去掉
            // str = str.replace(/-/g, "&minus;");//不需要转义
            // str = str.replace(/~/g, "&sim;");//不需要转义
            // str = str.replace(/\?/g, "&iexcl;");//不需要转义
            // str = str.replace(/\|/g, "&brvbar;");//不需要转义
            str = str.replace(/&/g, "§§"); //因为参数放于 json 对象中，所以不能包含 &
            // 不能包含 [] {} ,但是未进行转义，在以后需要时再进行转义
            return str;
        }
    }
}
export function sortList(sortBy, list) {
    return list.sort(function (a, b) {
        // 降序，若需要升序则互换两者位置
        var s = b[sortBy] - a[sortBy];
        // console.log('REPCALLBACK: ',s);
        return s;
    });
}
export function formatTime(time) {
    if (time < 10) {
        time = '0' + time;
    }
    return time;
}
export function replaceTransfer(str) {
    if (str.length === 0) return "";
    str = str.replace(/§§/g, '&');
    str = str.replace(/§/g, '+');
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/  /g, '\t');
    str = str.replace(/&lt;br\/&gt;/g, '\n');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&apos;/g, '\'');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/\//g, '\\');
    str = str.replace(/\\/g, '&#39;');
    str = str.replace(/&nbsp;/g, ' ');
    str = str.replace(/&lowast;/g, '*');
    str = str.replace(/&minus;/g, '−');
    str = str.replace(/&sim;/g, '~');
    str = str.replace(/&iexcl;/g, '?');
    str = str.replace(/&brvbar;/g, '|');
    str = str.replace(/&laquo;/g, '?');
    str = str.replace(/&not;/g, '?');
    return str;
}
export function toParam(obj) {
    var param = "";
    for (var key in obj) {
        if (typeof obj[key] != 'function') {
            param += "&" + key + "=" + encodeURI(obj[key]);
        }
    }
    return param.substring(1);
}
export function toDp(size, deviceWidth, scale) {
    return size * 750 / ( deviceWidth / scale ) + 'px';
}