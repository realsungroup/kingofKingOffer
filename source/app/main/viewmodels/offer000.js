define(['plugins/dialog', 'knockout'], function (dialog, ko) {
    var globThis
    var baseUrl=appConfig.app.baseUrl;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
   // var dbs=new dbHelper(baseUrl,user,ucode);
   
    //daffadgsdgfsgfd  
    var luyongid=appConfig.offer.luyongid;
    var luyongreid=appConfig.offer.luyongreid;
    var luyongsubid=appConfig.offer.luyongsubid;
    var resData;
    var subData;
    
    var recid;
    var approve;
    return {

        user:"",
        ucode:"",
        dbs:null,
        activate:function(e){
            if (e!==undefined)
            {
                appConfig.app.user=e.user;
                appConfig.app.ucode=e.ucode;
                user  = appConfig.app.user;
                ucode = appConfig.app.ucode;
                
                recid = e.recid;
                approve = e.approve;
                if(recid!=null&&approve!=null){
                    var o = {};
                    o._id=1;
                   o._state="modified";
                   o.C3_576925592015=approve;
                  //o.C3_577296084691=this.detailModel().C3_577296084691;
                   o.REC_ID=recid;
                   json="["+JSON.stringify(o)+"]";
                   this.dbs=new dbHelper(baseUrl,user,ucode);
                   this.dbs.dbSavedata(luyongid,0,json,fnSuccess=function(text){

                    alert("success");
                    //window.opener = null;//为了不出现提示框 
                    //window.close();
                    var a=document.getElementById("info");
                    var b=document.getElementById("applicationHost");
                   document.body.removeChild(a);
                   document.body.removeChild(b);
                   }, fnError=function(text){
                    alert("error");
                    // window.opener = null;//为了不出现提示框 
                    // window.close();
                    var a=document.getElementById("info");
                    var b=document.getElementById("applicationHost");
                   document.body.removeChild(a);
                   document.body.removeChild(b);

               } );
                    
                }else{
              this.dbs=new dbHelper(baseUrl,user,ucode);
            }
            }
        },
        clickDetail:function(){
           
           this.showdetail(true);
           this.showprocess(false);
           this.showmore(false);
        //    document.getElementById("line").style.height="";
        //    var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
        //    document.getElementById("line").style.height=h;
        },
        clickProcess:function(){
           
            this.showdetail(false);
            this.showprocess(true);
            this.showmore(false);
            // document.getElementById("line").style.height="";
            // var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
            // document.getElementById("line").style.height=h;
        },
        clickMore:function(){
           
            this.showdetail(false);
            this.showprocess(false);
            this.showmore(true);
            // document.getElementById("line").style.height="";
            // var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
            // document.getElementById("line").style.height=h;
        },
        approveSubmits:function(){
            console.log(resData);
            var jsonStr="",z=0;
            for(var y=0;y<resData.length;y++){
                if(resData[y].checkedState){
                    var o = {};
                    o._id=++z;
                    o._state="modified";
                    o.C3_576925592015="Y";
                 //   o.C3_577296084691=this.detailModel().C3_577296084691;
                    o.REC_ID=resData[y].REC_ID;
                    jsonStr+=JSON.stringify(o)+",";
                }
            }
            jsonStr=jsonStr.slice(0,-1);
            console.log(jsonStr);
            var json = "["+jsonStr+"]";
            this.dbs.dbSavedata(luyongid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(luyongid);
                    $("#c1").removeAttr("checked");
                    if(offerList.length==0||offerList==null){
                        this.data(true);
                    }else{
                        this.data(false);
                    }
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


            } );
        },
        rejectSubmits:function(){
console.log(resData);
            var jsonStr="",z=0;
            for(var y=0;y<resData.length;y++){
                if(resData[y].checkedState){
                    var o = {};
                    o._id=++z;
                    o._state="modified";
                    o.C3_576925592015="N";
                   // o.C3_577296084691=this.detailModel().C3_577296084691;
                   o.REC_ID=resData[y].REC_ID;
                    jsonStr+=JSON.stringify(o)+",";
                }
            }
            jsonStr=jsonStr.slice(0,-1);
            console.log(jsonStr);
            var json = "["+jsonStr+"]";
            this.dbs.dbSavedata(luyongid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(luyongid);
                    $("#c1").removeAttr("checked");
                    if(offerList.length==0||offerList==null){
                        this.data(true);
                    }else{
                        this.data(false);
                    }
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


            } );
        },
        approveSubmit: function(){//提交按钮
          //  dialog.showMessage("Approve this application?","confirm",[],true);
           if(confirm('Approve this application?')){
                var o = {};
                o._id=1;
               o._state="modified";
               o.C3_576925592015="Y";
               o.C3_577296084691=this.detailModel().C3_577296084691;
               o.REC_ID=this.detailModel().REC_ID;
               json="["+JSON.stringify(o)+"]";
               this.dbs.dbSavedata(luyongid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(luyongid);
                    if(offerList.length==0||offerList==null){
                        this.data(true);
                    }else{
                        this.data(false);
                    }
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
               o.C3_576925592015 ="N";
               o.C3_577296084691=this.detailModel().C3_577296084691;
               o.REC_ID=this.detailModel().REC_ID;
               json="["+JSON.stringify(o)+"]";
               
               this.dbs.dbSavedata(luyongid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(luyongid);
                    if(offerList.length==0||offerList==null){
                        this.data(true);
                    }else{
                        this.data(false);
                    }
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


               } );
              
           }
        },
        searchFn: function(){
            var keys = this.keys(),newData= []
            var reg = new RegExp(keys);
            for(var x=0;x<resData.length;x++){
                var a = resData[x].C3_577527878289;
                var b = resData[x].C3_575720834684;
                var c = resData[x].C3_575720832516;
                var val1=a.toLowerCase();
                var val2=b.toLowerCase();
                var val3=c.toLowerCase();
                if(val1.match(reg)||val2.match(reg)||val3.match(reg)){
                    newData.push(resData[x])
                }
                // if(resData[x].C3_575720834684.match(reg)){
                //     newData.push(resData[x])
                // }
                // if(resData[x].C3_575720832516.match(reg)){
                //     newData.push(resData[x])
                // }

                // if(resData[x].C3_577527878289.indexOf(keys)>=0){
                //     newData.push(resData[x])
                // }if(resData[x].C3_575720834684.indexOf(keys)>=0){
                //     newData.push(resData[x])
                // }if(resData[x].C3_575720832516.indexOf(keys)>=0){
                //     newData.push(resData[x])
                // }
            }
            this.oList([]);
            this.oList(newData);
        },
        allScreenFn: function(){
            if(this.allScreen()){
                this.allScreen(false);
                document.getElementById("line").style.display="none";
            }else{
                this.allScreen(true);
                document.getElementById("line").style.display="block";
            }
        },
        showdetail:ko.observable(),
        showprocess:ko.observable(),
        showmore:ko.observable(),
        showWFA:ko.observable(),
        showREW:ko.observable(),
        allScreen:ko.observable(),
        keys:ko.observable(""),
        oList:ko.observableArray([]),
        pList:ko.observableArray([]),
        list:ko.observable(),
        data:ko.observable(),
        detailModel:ko.observable({}),
        userName:ko.observableArray([]),
        attached:function(){
            var me=this;
            // var weekArr = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun']
            var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            globThis = this
            me.showdetail(true);
            me.showprocess(false);
            me.showmore(false);
            me.showWFA(true);
            me.showREW(true);
            me.allScreen(true);
            me.list(false);
            me.data(false);
            me.userName(user);
            $(function () {
                $("#search").keydown(function (e) {
                    if (e.keyCode == 13) {
                        me.keys($('#search').val())
                        me.searchFn()
                    }
                });
            });
            offerList=function(e){
                me.dbs.dbGetdata(e,0,"",fnSuccess,fnerror,fnhttperror);
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
                    if(resData.length==0||resData==null){
                        me.data(true);
                    }else{
                        me.data(false);
                    }
                    me.oList(resData);
                    //globThis.detailModel(data[0]);
                    //subDataFn(data[0].C3_576414848101);
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
                me.showREW(false)
                me.list(false);
            }
            rev= function(){
                me.showWFA(false)
                offerList(luyongreid)
                me.showREW(true)
                me.list(false)  
            }
            formatDate= function(e){
                if(e==""||e==null){
                    return ""
                }
                var date = e
                var year = date.getFullYear(); 
                var month = monthArr[date.getMonth()]; 
                var day = date.getDate();
                //var weekDay = weekArr[date.getDay()-1]; 
                return ' '+month+" "+day+" "+year;
            }
            selectAll= function(){
                   
                for(var j=0;j<resData.length;j++){
                    // resData[j].checkedState = $('#c1').attr("checked","true"); 
                     resData[j].checkedState = $('#c1').prop('checked');
                 }
                me.oList([]);
                me.oList(resData);
            }
            selectOnly= function(e){
                globThis.detailModel(e);
                me.oList([]);
                me.oList(resData);
                me.list(true);
                me.showdetail(true);
                me.showprocess(false);
                me.showmore(false);
                subDataFn(e.C3_575724542762);
                // document.getElementById("line").style.height="";
                // var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
                // document.getElementById("line").style.height=h;
            }
            
            print2 = function(e){       
                 bdhtml = window.document.body.innerHTML;  
                sprnstr = "<!--startprint-->";  
                eprnstr = "<!--endprint-->";  
                prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);  
                prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));  
                window.document.body.innerHTML = prnhtml;  
                if (getExplorer() == "IE") {  
                    pagesetup_null();  
                }  
                //window.print();
                document.execCommand("print");

//                 var printHtml = document.getElementById("right").innerHTML;

// var wind = window.open("",'newwindow', 'height=800, width=1000, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');

// wind.document.body.innerHTML = printHtml;

// wind.print();
// return false; 
            }  
            print = function() {
                document.getElementById("prints").style.display="none";
                document.getElementById("shrink").style.display="none";

                document.execCommand("print");
                document.getElementById("prints").style.display="block";
                document.getElementById("shrink").style.display="block";
            }
    
           
           
            subDataFn = function(e){
                var cmswhere="C3_576414881819='"+e+"'";
                me.dbs.dbGetdata(luyongsubid,0,cmswhere,fnSuccess,fnerror,fnhttperror);
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