var s = angular.module("SvcModule", ['FactModule']);

s.service("MenuService", function(MenuFactory){
    this.getAllMenuItems  = function(){
        return MenuFactory.getMenuItems();
    };
    this.addMenuItem = function(item){
        MenuFactory.addMenuItem(item);
    };
    this.deleteMenuItem = function(idx, mid){
        MenuFactory.deleteMenuItem(idx, mid);
    };
    this.editMenuItem = function(idx, menuItem){
        MenuFactory.editMenuItem(idx, menuItem);
    }
})


s.service("OrderService", function(OrderFactory){
    this.getOrderedItems = function(){
        return OrderFactory.getOrderedItems();
    };
    this.addOrderedItems = function(item){
        OrderFactory.addNewItem(item);
    };
    this.deleteOrderedItems = function(idx){
        OrderFactory.deleteItem(idx);
    };
    this.getTotalAmount = function(){
        var tot = 0;
        angular.forEach(OrderFactory.getOrderedItems(), function(e){
            tot += (e.price * e.qty);
        })
        return tot;    
    };
})