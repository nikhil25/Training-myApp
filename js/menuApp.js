//Create a module
var app = angular.module("menuApp", ['CtrlModule', 'ngSanitize', 'ngRoute', 'ngMessages']);

//Module loading phases
app.config(function($routeProvider){
    console.log("Menu app config")
    
    $routeProvider.when("/", {template: '<h3>Welcome to my Restaurant</h3>'})
    $routeProvider.when("/menucard", {templateUrl : 'partial/menucard.html'})
    $routeProvider.when("/manage", {templateUrl: "partial/manage.html", controller: 'MenuController'})
    //$routeProvider.otherwise({template: "<h1>OOPS!!! page not found :O</h1>"})
    
    //LOGIN
    $routeProvider.when("/login", {templateUrl: "partial/login.html", controller: 'LoginController'});
    $routeProvider.when("/error", {template: "<h1>Invalid Credentials</h1>"});
    $routeProvider.when("/logout", {template: "<h3>Log out successful</h3>"});
    
    //SIGNUP
    $routeProvider.when("/signup", {templateUrl: "partial/signup.html", controller: 'SignupController'});
    
    $routeProvider.otherwise({redirectTo : "/"})
})

app.run(function($rootScope){
    console.log("Menu app run")
    $rootScope.isLogin = false;
})


//Register a value object vorders

//app.value("vorders", []);   //use instead of value

//Register a filter
app.filter("truncate", function(){
    return function(input, param){
        var result = (input.length > param) ? input.substr(0, param) + "..." : input;
        return result;
    }
})