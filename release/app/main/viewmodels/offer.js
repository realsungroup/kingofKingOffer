define(['plugins/dialog', 'knockout'], function (dialog, ko) {
    var globThis
    var baseUrl=appConfig.app.baseUrl;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var luyongid=appConfig.offer.luyongid;
    var luyongreid=appConfig.offer.luyongreid;
    var luyongsubid=appConfig.offer.luyongsubid;
    var resData;
    var subData;
    return {

        user:"",
        ucode:"",
        activate:function(e){
            if (e!==undefined)
            {
               appConfig.app.user=e.user;
               appConfig.app.ucode=e.ucode;
            }
        },
        clickDetail:function(){
           
           this.showdetail(true);
           this.showprocess(false);
        },
        clickProcess:function(){
           
            this.showdetail(false);
            this.showprocess(true);
        },
        approveSubmits:function(){

        },
        rejectSubmits:function(){

        },
        approveSubmit: function(){//提交按钮
           if(confirm('Approve this application?')){
                var o = {};
                o._id=1;
               o._state="modified";
               o.C3_576925592015="Y";
               o.C3_577296084691=this.detailModel().C3_577296084691;
               o.REC_ID=this.detailModel().REC_ID;
               json="["+JSON.stringify(o)+"]";
               dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList();
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


               } );
           }
       },
       rejectSubmit: function(){//提交按钮
           if(confirm('Reject this application?')){
               var o = {};
               o._id=1;
               o._state="modified";
               o.C3_576268065103="N";
               o.C3_576267780129=this.detailModel().C3_576267780129;
               o.REC_ID=this.detailModel().REC_ID;
               json="["+JSON.stringify(o)+"]";
               
               dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList();
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


               } );
              
           }
        },
        searchFn: function(){
            var keys = this.keys(),newData= []
            for(var x=0;x<resData.length;x++){
                if(resData[x].C3_576326288823.indexOf(keys)>=0){
                    newData.push(resData[x])
                }
            }
            this.oList([]);
            this.oList(newData);
        },
        allScreenFn: function(){
            if(this.allScreen()){
                this.allScreen(false);
            }else{
                this.allScreen(true);
            }
        },
        showdetail:ko.observable(),
        showprocess:ko.observable(),
        showWFA:ko.observable(),
        allScreen:ko.observable(),
        keys:ko.observable(""),
        oList:ko.observableArray([]),
        pList:ko.observableArray([]),
        detailModel:ko.observable({}),
        attached:function(){
            var me=this;
            var weekArr = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun']
            var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            globThis = this
            me.showdetail(true);
            me.showprocess(false);
            me.showWFA(true);
            me.allScreen(true);
            $(function () {
                $("#search").keydown(function (e) {
                    if (e.keyCode == 13) {
                        me.keys($('#search').val())
                        me.searchFn()
                    }
                });
            });
            offerList=function(e){
                dbs.dbGetdata(e,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data,subdata){
                    for(var i=0;i<data.length;i++){
                        data[i].date = formatDate(data[i].REC_CRTTIME)
                        var sdate = new Date(data[i].REC_CRTTIME);
                        var now = new Date();
                        var days = now.getTime() - sdate.getTime();
                        days = parseInt(days / (1000 * 60 * 60 * 24));
                        data[i].days = days
                        data[i].checkedState = false
                        data[i].dataIndex = i
                    }
                    resData = data;
                    me.oList([]);
                    me.oList(resData);
                    globThis.detailModel(data[0]);
                    subDataFn(data[0].C3_576414848101);
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
            offerList(luyongid);
            wfa= function(){
                me.showWFA(true)
                offerList(luyongid)
            }
            rev= function(){
                me.showWFA(false)
                offerList(luyongreid)
            }
            formatDate= function(e){
                if(e==""||e==null){
                    return ""
                }
                var date = e
                var year = date.getFullYear(); 
                var month = monthArr[date.getMonth()]; 
                var day = date.getDate();
                var weekDay = weekArr[date.getDay()-1]; 
                return weekDay+' '+month+" "+day+" "+year;
            }
            selectAll= function(){
                for(var j=0;j<resData.length;j++){
                    resData[j].checkedState = $('#c1').prop('checked')
                }
                me.oList([]);
                me.oList(resData);
            }
            selectOnly= function(e){
                globThis.detailModel(e);
                me.oList([]);
                me.oList(resData);
                subDataFn(e.C3_576414848101)
            }
            subDataFn = function(e){
                var cmswhere="C3_576414881819='"+e+"'";
                dbs.dbGetdata(luyongsubid,0,cmswhere,fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    for(var l=0;l<data.length;l++){
                        data[l].date = formatDate(data[l].C3_576414952007)
                    }
                    me.pList(data)
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
        }
    }
});