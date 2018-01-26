<template>
    <div>
        <cell-header tit="近期消费明细" :close="clickClose"></cell-header>
        <cell-tab class="cell_tab"  :tabMargin="20" :list="list"
                  @clickTabPar="clickTabPar"></cell-tab>
        <scroller class="scroll" append="tree">
            <cell-error v-if="errorInfo.errorMess" :errorImg="errorInfo.errorImg"
                        :errorMess="errorInfo.errorMess"></cell-error>
            <div v-ratio="ratio" v-for="item in orderDetail">
                <cell-card :tit="item.Extra.DESC" :txtElse="item.hasOwnProperty('NEEDFOLD')?(item.showed?'折叠':'展开'):''"
                           :item="item"></cell-card>
            </div>
        </scroller>
    </div>
</template>

<script>
    const configModule = weex.requireModule('configModule');
    const modal = weex.requireModule('modal');
    const navigator = weex.requireModule('navigator');
    var storage = weex.requireModule('storage');

    module.exports = {
        components: {
            cellHeader: require('../../components/header/yyzs-header.vue'),
            CellCard: require('../../components/card/sy-card.vue'),
            CellError: require('../../components/error.vue'),
            CellTab: require('../../components/tab/sy-tab.vue'),
        },
        computed: {
            orderDetail(){
//                console.log("member: ",this.$store.getters.getOrderDetail )
                return this.$store.getters.getOrderDetail;
            },
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
        },
        data(){
            return {
                baseUrl: '',
                memberID: '',
                list: ["全部", "重点商品", "重点孕婴", "重点糖尿病"],
                params: ["", "ZDPT", "ZDYY", "ZDTNB"],
                selected: 0,
            }
        },
        methods: {
            //关闭界面，退出
            clickClose: function () {
                configModule.finish();
            },
            clickTabPar(index){
                let self = this;
//                console.log("par",index);
                if (self.selected != index) {
                    self.selected = index;
                    self.getData();
                }

            },
            clickShow(item, index){
                item.showed = !item.showed;
            },
//            getData(tokens){
//                let self=this;
//                var accessType = tokens.tokenType;
//                var accessToken = tokens.accessToken;
////                var body = {"COMPANYCODE": "999999"};
//                var body = {"COMPANYCODE": "999999"};
//                var header = {
//                    "content-type": "application/json",
//                    "authorization": accessType + ' ' + accessToken
//                };
//                self.$store.dispatch('FETCH_QUERY_ORDER_DETAIL', {
//                    id:self.memberID,body: body, header: header})
////                self.$store.dispatch('FETCH_SY_QUERY_DETAILS', {id:self.memberID,body:body,header:header});
//            },
//            isHaveToken(tokens){
//                let self = this;
//                var time = tokens.saveTime + (tokens.expiresIn-10*60)*1000;//令牌提前十分钟失效所以 -10*60；令牌是以分钟为单位的，所以 *1000
//                if (tokens.hasOwnProperty("accessToken") && tokens.accessToken && self.compareTime(time)) {
//                    self.getData(tokens)
//                } else {
//                    self.$router.push(`/getToken`)
//                }
//            },
//            getStorage(){
//                let self = this;
//                var tokens;
//                storage.getItem("sy_token", function (e) {
//                    if (e.result == "success" && e.data != "undefind") {
//                        tokens = JSON.parse(e.data);
//                    } else {
//                        tokens = {};
//                    }
//                    console.log(tokens);
//                    self.isHaveToken(tokens)
//                })
//            },
            getData(){
                let self = this;
                var params = {};
                params.MEMBERID = self.memberID;
                params.FILTERWEIGHT = self.params[self.selected];
                self.$store.dispatch('FETCH_QUERY_ORDER_DETAIL', {params: JSON.stringify(params)});
//                var data = {
//                    "CODE": "E",
//                    "MESSAGE": "查询会员消费明细异常！原因：XCode.Exceptions.XSqlException: Timeout expired.  The timeout period elapsed prior to completion of the operation or the server is not responding.[SQL:Select * From SYCRM_ORDERS_DETAIL_201801 Order By ORDERNO,ORDERDETAILNO limit 50][DB:CloudCRM/MySql] ---> MySql.Data.MySqlClient.MySqlException: Timeout expired.  The timeout period elapsed prior to completion of the operation or the server is not responding. ---> System.TimeoutException: 无法从传输连接中读取数据: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。。 ---> System.IO.IOException: 无法从传输连接中读取数据: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。。 ---> System.Net.Sockets.SocketException: 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。\r\n   在 System.Net.Sockets.Socket.Receive(Byte[] buffer, Int32 offset, Int32 size, SocketFlags socketFlags)\r\n   在 System.Net.Sockets.NetworkStream.Read(Byte[] buffer, Int32 offset, Int32 size)\r\n   --- 内部异常堆栈跟踪的结尾 ---\r\n   在 System.Net.Sockets.NetworkStream.Read(Byte[] buffer, Int32 offset, Int32 size)\r\n   在 MySql.Data.Common.MyNetworkStream.Read(Byte[] buffer, Int32 offset, Int32 count)\r\n   --- 内部异常堆栈跟踪的结尾 ---\r\n   在 MySql.Data.Common.MyNetworkStream.Read(Byte[] buffer, Int32 offset, Int32 count)\r\n   在 MySql.Data.MySqlClient.TimedStream.Read(Byte[] buffer, Int32 offset, Int32 count)\r\n   在 System.IO.BufferedStream.Read(Byte[] array, Int32 offset, Int32 count)\r\n   在 MySql.Data.MySqlClient.MySqlStream.ReadFully(Stream stream, Byte[] buffer, Int32 offset, Int32 count)\r\n   在 MySql.Data.MySqlClient.MySqlStream.LoadPacket()\r\n   在 MySql.Data.MySqlClient.MySqlStream.ReadPacket()\r\n   在 MySql.Data.MySqlClient.NativeDriver.GetResult(Int32& affectedRow, Int64& insertedId)\r\n   在 MySql.Data.MySqlClient.Driver.GetResult(Int32 statementId, Int32& affectedRows, Int64& insertedId)\r\n   在 MySql.Data.MySqlClient.Driver.NextResult(Int32 statementId, Boolean force)\r\n   在 MySql.Data.MySqlClient.MySqlDataReader.NextResult()\r\n   在 MySql.Data.MySqlClient.MySqlCommand.ExecuteReader(CommandBehavior behavior)\r\n   --- 内部异常堆栈跟踪的结尾 ---\r\n   在 MySql.Data.MySqlClient.ExceptionInterceptor.Throw(Exception exception)\r\n   在 MySql.Data.MySqlClient.MySqlConnection.Throw(Exception ex)\r\n   在 MySql.Data.MySqlClient.MySqlConnection.HandleTimeoutOrThreadAbort(Exception ex)\r\n   在 MySql.Data.MySqlClient.MySqlCommand.ExecuteReader(CommandBehavior behavior)\r\n   在 MySql.Data.MySqlClient.MySqlCommand.ExecuteDbDataReader(CommandBehavior behavior)\r\n   在 System.Data.Common.DbCommand.System.Data.IDbCommand.ExecuteReader(CommandBehavior behavior)\r\n   在 System.Data.Common.DbDataAdapter.FillInternal(DataSet dataset, DataTable[] datatables, Int32 startRecord, Int32 maxRecords, String srcTable, IDbCommand command, CommandBehavior behavior)\r\n   在 System.Data.Common.DbDataAdapter.Fill(DataSet dataSet, Int32 startRecord, Int32 maxRecords, String srcTable, IDbCommand command, CommandBehavior behavior)\r\n   在 System.Data.Common.DbDataAdapter.Fill(DataSet dataSet)\r\n   在 XCode.DataAccessLayer.DbSession.Query(DbCommand cmd) 位置 E:\\X\\Src\\XCode\\DataAccessLayer\\Common\\DbSession.cs:行号 421\r\n   --- 内部异常堆栈跟踪的结尾 ---\r\n   在 XCode.DataAccessLayer.DbSession.Query(DbCommand cmd) 位置 E:\\X\\Src\\XCode\\DataAccessLayer\\Common\\DbSession.cs:行号 426\r\n   在 XCode.DataAccessLayer.DbSession.Query(String sql, CommandType type, IDataParameter[] ps) 位置 E:\\X\\Src\\XCode\\DataAccessLayer\\Common\\DbSession.cs:行号 399\r\n   在 XCode.DataAccessLayer.DAL.Select(SelectBuilder builder, Int64 startRowIndex, Int64 maximumRows) 位置 E:\\X\\Src\\XCode\\DataAccessLayer\\DAL_DbOperate.cs:行号 57\r\n   在 XCode.EntitySession`1.Query(SelectBuilder builder, Int64 startRowIndex, Int64 maximumRows) 位置 E:\\X\\Src\\XCode\\Entity\\EntitySession.cs:行号 591\r\n   在 XCode.Entity`1.FindAll(Expression where, String order, String selects, Int64 startRowIndex, Int64 maximumRows) 位置 E:\\X\\Src\\XCode\\Entity\\Entity.cs:行号 716\r\n   在 CloudCRM.Core.SYCRM.Query.SYCRMOrderQuery.QueryMemberOrderDetailFor6M(String memberCode) 位置 C:\\x\\DevCodes\\CloudCRM\\CloudCRM.Core.SYCRM\\Query\\SYCRMOrderQuery.cs:行号 24\r\n   在 CloudCRM.WebApi.Controllers.SYCRMAPPOrderController.QueryOrderDetailLately(String id, IDictionary`2 funcParams) 位置 C:\\x\\DevCodes\\CloudCRM\\CloudCRM.WebApi\\Controllers\\SYCRMAPPOrderController.cs:行号 32"
//                };
//                self.$store.commit('GET_SY_ORDER_DETAIL', {data: data});
            },
            getParams(url){
                let self = this;
                let paramsArr = url.split("&");
                for (let i = 0; i < paramsArr.length; i++) {
                    if (paramsArr[i].split("=")[0] == "memberid") {
                        self.memberID = paramsArr[i].split("=")[1];
                    } else if (paramsArr[i].split("=")[0] == "token") {
                        self.$store.commit('SET_TOKEN', {token: paramsArr[i].split("=")[1]});
                    }
                }
                self.getData();
            },
        },
        created(e){
            let self = this;
//            var bundleUrl = self.$getConfig().bundleUrl || '';
//            memberid=1001502924
            var bundleUrl = 'http://weex.yy365.cn/sy-member.js?memberid=1005437214&token=@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjIuMmMxNzA4MzB8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi';
//            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js?memberid=1005437214&token=@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjIuMmMxNzA4MzB8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi';
            let urlArr = bundleUrl.split("?");
            self.baseUrl = urlArr[0].split('/').slice(0, -1).join('/');
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
            if (urlArr.length > 1) {
                self.getParams(urlArr[1]);
            } else {
                self.$store.commit('SET_ERROR', {showType: 2, mess: "ERROR: 参数缺失"});
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .cell_tab {
        margin-bottom: $cl;
    }

    .scroll {
        background-color: $wg;
    }
</style>