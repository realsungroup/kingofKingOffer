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
                  o.C3_576268065103=approve;
                 //o.C3_577296084691=this.detailModel().C3_577296084691;
                  o.REC_ID=recid;
                  json="["+JSON.stringify(o)+"]";
                  this.dbs=new dbHelper(baseUrl,user,ucode);
                  this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                    alert("success");
                    // window.opener = null;//为了不出现提示框 
                    // window.close();
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
        //    document.getElementById("line").style.height="";
        //    var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
        //    document.getElementById("line").style.height=h;
        },
        clickProcess:function(){
           
            this.showdetail(false);
            this.showprocess(true);
            // document.getElementById("line").style.height="";
            // var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
            // document.getElementById("line").style.height=h;
        }, 
        searchFn: function(e){
            var keys = this.keys(),newData= []
            var reg = new RegExp(keys);
            for(var x=0;x<resData.length;x++){
                var a = resData[x].C3_576326288823;
                var b = resData[x].states;
                var val=a.toLowerCase();
                var val2=b.toLowerCase();
                if(val.indexOf(keys)>=0||val2.match(reg)){
                    newData.push(resData[x])
                }
            }
            this.oList([]);
            this.oList(newData);
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
                    o.REC_ID=resData[y].REC_ID;
                    jsonStr+=JSON.stringify(o)+",";
                }
            }
            jsonStr=jsonStr.slice(0,-1);
            console.log(jsonStr);
            var json = "["+jsonStr+"]";
            var _this =this;
            this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(offid);
                    $('#c1').removeAttr("checked");
                    if(offerList.length==0||offerList==null){
                        _this.data(true);
                    }else{
                        _this.data(false);
                    }
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


            } );
        },
        rejectSubmits:function(){
            if(confirm('Reject this application?')){
            console.log(resData);
            var jsonStr="",z=0;
            for(var y=0;y<resData.length;y++){
                if(resData[y].checkedState){
                    var o = {};
                    o._id=++z;
                    o._state="modified";
                    o.C3_576268065103="N";
                    o.C3_576267780129=this.detailModel().C3_576267780129;
                    o.REC_ID=resData[y].REC_ID;
                    jsonStr+=JSON.stringify(o)+",";
                }
            }
            jsonStr=jsonStr.slice(0,-1);
            console.log(jsonStr);
            var json = "["+jsonStr+"]";
            var _this=this
            this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(offid);
                    //document.getElementById("#c1").removeAttr("checked");
                $('#c1').removeAttr("checked");
                    if(offerList.length==0||offerList==null){
                        _this.data(true);
                    }else{
                        _this.data(false);
                    }
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


            } );
        }
        },
        approveSubmit: function(){//提交按钮
        //    if(confirm('Approve this application?')){
            // if(!this.detailModel().REC_ID){
            //     return false
            // }
        //    $("#search").keydown(function (e) {
        //     if (e.keyCode == 13) {
        //     alert("b不b把")
        //         me.searchFn()
        //     }
        // })
            // if(!this.detailModel().REC_ID||!offid||!this.detailModel().C3_576267780129){
            //     return false;
            // }
                var o = {};
                o._id=1;
               o._state="modified";
               o.C3_576268065103="Y";
               o.C3_576267780129=this.detailModel().C3_576267780129;
               o.REC_ID=this.detailModel().REC_ID;
               json="["+JSON.stringify(o)+"]";
               var _this=this
              this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(offid);
                    if(offerList.length==0||offerList==null){
                        _this.data(true);
                    }else{
                        _this.data(false);
                    }
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


               } );
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
               var _this=this
               this.dbs.dbSavedata(offid,0,json,fnSuccess=function(text){
                
                setTimeout(function() {
                    
                    offerList(offid);
                    if(offerList.length==0||offerList==null){
                        _this.data(true);
                    }else{
                        _this.data(false);
                    }
                }, 500);

               }, fnError=function(text){
                   alert(text.message);


               } );
              
           }
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
        showWFA:ko.observable(),
        allScreen:ko.observable(),
        list:ko.observable(),
        keys:ko.observable(""),
        data:ko.observable(""),
        expand:ko.observable(""),
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
            me.showdetail(false);
            me.showprocess(true);
            me.showWFA(true);
            me.allScreen(true);
            me.list(false);
            me.data(false);
            me.expand(true);
            me.userName(user);
            $(function () {
                $("#search").keydown(function (e) {
                    if (e.keyCode == 13) {
                        me.keys($('#search').val())
                        me.searchFn()
                        return false;
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
                        if (data[i].states==undefined)
                        {
                            data[i].states="";
                        }
                    }
                    resData = data;
                    if(resData.length==0||resData==null){
                        me.data(true);
                    }else{
                        me.data(false);
                    }
                    console.log(resData)
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
                    //resData[j].checkedState = $('#c1').attr("checked","true"); 
                    resData[j].checkedState = $('#c1').prop('checked');
                }
                me.oList([]);
                me.oList(resData);
            }
           
            selectOnly= function(e){
                console.log(e)
                globThis.detailModel(e);
                me.oList([]);
                me.oList(resData);
                console.log(resData)

                me.list(true);
                me.showdetail(false);
                me.showprocess(true);
                subDataFn(e.C3_575717069969);
                // document.getElementById("line").style.height="";
                // var h = (document.getElementById("rightDetail").parentNode. scrollHeight-101)+"px";
                // document.getElementById("line").style.height=h;
                    $('table tr').removeClass("on");
                    $(this).addClass("on");
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
            expand = function(){
                document.getElementById("more").style.display="block";
                me.expand(false);
                 document.getElementById("line").style.height="";
                 var h = (document.getElementById("rightDetail").parentNode. scrollHeight)+"px";
                 document.getElementById("line").style.height=h;
                //  alert($('#line').text());
                 $("#form1").scrollTop(1000);
                // window.scrollTo(100,1000)
            //    document.documentElement.scrollTop(1000);
            //    alert(document.documentElement.scrollTop);
            // window.scrollTo(100,1000);
            // alert(window.body.scrollHeight);
            // alert(document.documentElement.clientHeight+"aaa"+document.getElementById("rightDetail").parentNode. scrollHeight);
            //  document.documentElement.scrollTop(1000);
            // $("form1").style.display="block";
            // window.scrollTo(0,document.getElementById("rightDetail").parentNode. scrollHeight);

            //  setTimeout(() => {
                 
            //     $("#form1").scrollTop(1000);
            //  }, 500);
            
            //  window.pageYOffset =1000;
            //   document.documentElement.scrollTop =1000;
            //    document.body.scrollTop;
            }
            roll = function(){ 
                // $("body,html").animate({
                // scrollTop:1200  //让body的scrollTop等于pos的top，就实现了滚动
                // },0);
                document.getElementById("more").style.display="none";
                me.expand(true);
                 document.getElementById("line").style.height="";
                 var h = (document.documentElement.clientHeight-110)+"px";
                 //document.getElementById("line").addClass('line');
                 document.getElementById("line").style.height=h;
                //  alert(document.documentElement.scrollTop);
                // window.document.scrollTo(0,1500);
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