define(['plugins/dialog', 'knockout'], function (dialog, ko) {
    var globThis
    var baseUrl=appConfig.app.baseUrl;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
   
    var offid=appConfig.offer.offid;
    var offreid=appConfig.offer.offreid;
    var offsubid=appConfig.offer.offsubid;
    var resData;
    var subData;
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
                  o.C3_576268065103=approve;
                 //o.C3_577296084691=this.detailModel().C3_577296084691;
                  o.REC_ID=recid;
                  json="["+JSON.stringify(o)+"]";
                  this.dbs=new dbHelper(baseUrl,user,ucode);
                  this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                    alert("success");
                     var a=document.getElementById("info");
                     var b=document.getElementById("applicationHost");
                    document.body.removeChild(a);
                    document.body.removeChild(b);
                  }, fnError=function(text){
                    alert("error");
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
           document.getElementById("line").style.height="";
           var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
           document.getElementById("line").style.height=h;
        },
        clickProcess:function(){
           
            this.showdetail(false);
            this.showprocess(true);
            document.getElementById("line").style.height="";
            var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
            document.getElementById("line").style.height=h;
        },
        approveSubmits:function(){
            console.log(resData);
            var jsonStr="",z=0;
            for(var y=0;y<resData.length;y++){
                if(resData[y].checkedState){
                    var o = {};
                    o._id=++z;
                    o._state="modified";
                    o.C3_576268065103="Y";
                   // o.C3_576267780129=this.detailModel().C3_576267780129;
                    o.REC_ID=resData[y].REC_ID;
                    jsonStr+=JSON.stringify(o)+",";
                }
            }
            jsonStr=jsonStr.slice(0,-1);
            console.log(jsonStr);
            var json = "["+jsonStr+"]";
            this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(offid);
                    //document.getElementById("#c1").removeAttr("checked");
                    $('#c1').removeAttr("checked");
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
                    o.C3_576268065103="N";
                    //o.C3_576267780129=this.detailModel().C3_576267780129;
                    o.REC_ID=resData[y].REC_ID;
                    jsonStr+=JSON.stringify(o)+",";
                }
            }
            jsonStr=jsonStr.slice(0,-1);
            console.log(jsonStr);
            var json = "["+jsonStr+"]";
            this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(offid);
                    //document.getElementById("#c1").removeAttr("checked");
                $('#c1').removeAttr("checked");
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
           if(confirm('Approve this application?')){
                var o = {};
                o._id=1;
               o._state="modified";
               o.C3_576268065103="Y";
               o.C3_576267780129=this.detailModel().C3_576267780129;
               o.REC_ID=this.detailModel().REC_ID;
               json="["+JSON.stringify(o)+"]";
              this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(offid);
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
               o.C3_576268065103="N";
               o.C3_576267780129=this.detailModel().C3_576267780129;
               o.REC_ID=this.detailModel().REC_ID;
              

               json="["+JSON.stringify(o)+"]";
               
               this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(offid);
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
                // document.getElementById("Location1").style.width="6.9%";
                // document.getElementById("Title1").style.width="6.9%";
                // document.getElementById("Replacement1").style.width="6.9%";
                // document.getElementById("Replece1").style.width="6.9%";
                // document.getElementById("Function1").style.width="6.9%";
                // document.getElementById("Manager1").style.width="6.9%";
                // document.getElementById("Department1").style.width="6.9%";
                // document.getElementById("Manager").style.width="70.5%";
                // document.getElementById("Department").style.width="70.5%";
                // document.getElementById("Location").style.width="70.5%";
                // document.getElementById("Title").style.width="31.4%";
                // document.getElementById("Replacement").style.width="31.4%";
                // document.getElementById("Replece").style.width="31.4%";
                // document.getElementById("Function").style.width="31.4%";
            }else{
                this.allScreen(true);
                // document.getElementById("Location1").style.width="11%";
                // document.getElementById("Title1").style.width="11%";
                // document.getElementById("Replacement1").style.width="11%";
                // document.getElementById("Replece1").style.width="11%";
                // document.getElementById("Function1").style.width="11%";
                // document.getElementById("Manager1").style.width="11%";
                // document.getElementById("Department1").style.width="11%";
                // document.getElementById("Manager").style.width="67.2%";
                // document.getElementById("Department").style.width="67.2%";
                // document.getElementById("Location").style.width="67.2%";
                // document.getElementById("Title").style.width="26.4%";
                // document.getElementById("Replacement").style.width="28.5%";
                // document.getElementById("Replece").style.width="26.4%";
                // document.getElementById("Function").style.width="28.5%";
            }
        },
        showdetail:ko.observable(),
        showprocess:ko.observable(),
        showWFA:ko.observable(),
        allScreen:ko.observable(),
        list:ko.observable(),
        keys:ko.observable(""),
        data:ko.observable(""),
        oList:ko.observableArray([]),
        pList:ko.observableArray([]),
        detailModel:ko.observable({}),
        offerList:ko.observable({}),
        userName:ko.observableArray([]),
        attached:function(){
            var me=this;
            //var weekArr = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun']
            var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            globThis = this
            me.showdetail(true);
            me.showprocess(false);
            me.showWFA(true);
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
                    if(resData.length==0||resData==null){
                        me.data(true);
                    }else{
                        me.data(false);
                    }
                    me.oList([]);
                    me.oList(resData);
                    //globThis.detailModel(data[0]);
                   // subDataFn(data[0].C3_576268551502);
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
            offerList(offid);
            wfa= function(){
                me.showWFA(true)
                me.list(false)
                offerList(offid)
            }
            rev= function(){
                me.showWFA(false)
                me.list(false)
                offerList(offreid)
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
                    resData[j].checkedState = $('#c1').attr("checked","true"); 
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
                subDataFn(e.C3_575717069969);
                document.getElementById("line").style.height="";
                var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
                document.getElementById("line").style.height=h;
            }
            print = function() {
               // var newstr = document.getElementById("right").innerHTML;   //获得需要打印的内容
                
                //document.body.innerHTML = newstr; //将网页内容更改成需要打印
                document.getElementById("prints").style.display="none";
                document.getElementById("shrink").style.display="none";

                document.execCommand("print");
                document.getElementById("prints").style.display="block";
                document.getElementById("shrink").style.display="block";
                //document.body.innerHTML = oldstr;   //将网页还原
                //location.reload();
            }
    
           
            subDataFn = function(e){
                var cmswhere="C3_576268636456='"+e+"'";
                me.dbs.dbGetdata(offsubid,0,cmswhere,fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    for(var l=0;l<data.length;l++){
                        data[l].date = formatDate(data[l].C3_576268677908)
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