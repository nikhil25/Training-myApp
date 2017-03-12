var cModule = angular.module("CtrlModule", ['SvcModule']);

//Module loading phases
cModule.config(function(){
    console.log("Ctrl module config")
})

cModule.run(function(){
    console.log("Ctrl module run")
})

//Register Main Controller
cModule.controller("MainController", function($rootScope, $scope, $location){    
    $scope.pageHeading = "<u> SG Restaurant Menu Handling </u   >";
    
    $scope.$on("$routeChangeStart", function(){
        if(!$rootScope.isLogin && $location.path() == "/manage")
            {
                $location.path("/login");
            }
    })
    
    $scope.$on("$routeChangeSuccess", function(){
        console.log("Route change success" + $location.path());
        if($location.path() == "/logout")
            {
                $rootScope.isLogin = false;    
            }            
    })
})

//Create a new controller "SignupController"
cModule.controller("SignupController", function($rootScope, $scope, $location){
    $scope.stateList = [
        {stateId: 1, Name: "Karnataka"},
        {stateId: 2, Name: "Maharashtra"}
    ]
    })

//Create a new controller "LoginController"
cModule.controller("LoginController", function($rootScope, $scope, $location){
    $scope.doLogin = function(){
        if($scope.login.username == "admin"){
            $location.path("/manage");
            $rootScope.isLogin = true;
        } else {
            $location.path("/error");
        }
    }
})

//Create new controller "MenuController"
cModule.controller("MenuController", function($scope, MenuService, OrderService){
    console.log("Menu Controller Executed...");
    
    var flag = -1;
    
    $scope.itemList = MenuService.getAllMenuItems();
    
    $scope.placeOrder = function(menuItem){
            var orderedItem = {"name" : menuItem.name , "price" : menuItem.price, "qty": 1};
            OrderService.addOrderedItems(orderedItem);            
    };
    
    $scope.save = function(){
        if(flag ==-1){
            MenuService.addMenuItem($scope.newmenuitem);                
        }
        else{
            MenuService.editMenuItem(flag, $scope.newmenuitem);
            flag = -1;
        }
        $scope.newmenuitem = {};
    }
    
    $scope.remove = function(idx, mid){
        MenuService.deleteMenuItem(idx, mid);            
    }
    
    $scope.edit = function(idx, menuItem){
        $scope.newmenuitem = angular.copy(menuItem);
        flag = idx;
    }
})

//Create a new controller named "OrderController"
cModule.controller("OrderController", function($scope, OrderService){
    console.log("Order Controller Executed...");
    
    $scope.myOrders = OrderService.getOrderedItems();
    
    $scope.cancelOrder = function(idx){
        OrderService.deleteOrderedItems(idx);
    };
        
    $scope.totalAmount = function(){
        return OrderService.getTotalAmount();   
    };
})