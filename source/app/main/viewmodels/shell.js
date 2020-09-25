define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
             
                { route: ['','offer'],title:'Offer', moduleId: 'main/viewmodels/offer', nav: true },
                { route: 'headcount',title:'Headcount', moduleId: 'main/viewmodels/headcount', nav: true },
                { route: 'offerp',title:'Offer', moduleId: 'main/viewmodels/offerp', nav: true }

            ]).buildNavigationModel();
           
            return router.activate();
        }
    };
});