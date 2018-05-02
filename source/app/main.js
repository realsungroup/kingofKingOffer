requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'jqueryprint': '../lib/jquery/jquery.jPrintArea',
        'realsun': '../lib/realsun/js',
        'calendar': '../lib/fullcalendar',
        'pace':'../vendor/pace.js/pace.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap','realsun/common'],  function (system, app, viewLocator) {
  
    app.title = ' ';
    app.configurePlugins({
        router:true,
        dialog: true
    });
  
    app.start().then(function() {
        viewLocator.useConvention();
         $.getJSON("app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions;
        
         system.debug(appConfig.app.debug);
         system.log(appConfig);
        //    if (!CheckLODOPIsInstall())
        //     {
        //         appConfig.app.setupprinter=false;
        //     }
        //     if (appConfig.app.setupprinte)
        //     {
        //        appConfig.app.LODOP =getLodop();
        //     }
         app.setRoot('main/viewmodels/shell', 'entrance');});
        

    });
    // 检查打印组件是否安装
    function CheckLODOPIsInstall() {	 
		try{ 
		     var LODOP=getLodop(); 
			if (LODOP.VERSION) {
				//  if (LODOP.CVERSION)
                //   alert("当前有C-Lodop云打印可用!\n C-Lodop版本:"+LODOP.CVERSION+"(内含Lodop"+LODOP.VERSION+")"); 
				  
				//  else
				//  alert("本机已成功安装了Lodop控件！\n 版本号:"+LODOP.VERSION); 
                return true;
			};
		 }catch(err){ 
             return false;
 		 } 
	}; 
});
