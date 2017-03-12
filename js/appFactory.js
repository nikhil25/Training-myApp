var f = angular.module("FactModule", ["ngResource"]);

f.factory("MenuFactory", function($resource){
          var menuItems ;
          var menuResources = $resource("http://localhost:2403/wsmenuitems", 
                                       {"id": "@mid"});
        
    return {
        getMenuItems: function(){
            menuItems = menuResources.query();
            return menuItems;
        },
        addMenuItem: function(newmenuitem){
            menuResources.save(newmenuitem, function(data){
                console.log("Save Success", data)
                menuItems.push(data);
            },
                function(err){
                    console.log("Save Error", err)
            })
        },
        deleteMenuItem: function(idx, mid){
            menuResources.remove({"id": mid}, function(){
               console.log("Delete Success")
               menuItems.splice(idx, 1);
            }, function(){
                console.log("Delete Error") 
            })                    
        },
        editMenuItem: function(idx, menuItem){
            menuResources.save(menuItem, function(data){
                console.log("Update Successful ", data)
                menuItems[idx] = menuItem;
            }, function(err){
                console.log("Update Error ", err)
            })                        
        }    
}
})

f.factory("OrderFactory" , function(){
    var orderedItems = [];
    
    return {
        getOrderedItems: function(){
            return orderedItems;
        },
        addNewItem: function(item){
            orderedItems.push(item);    
        },
        deleteItem: function(idx){
            orderedItems.splice(idx, 1);
        }
        
    }
})