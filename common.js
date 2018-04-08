'use strict';

var storeApp = angular.module('storeApp', []);

storeApp.controller('FridgeListCtrl', function($scope){
    $scope.basket = [];
    $scope.page = 1;
    $scope.openPage = "store";
    $scope.maxItems = 6;
    $scope.itemsPage = [];
    
    $scope.fridges = [
        {
            "name": "fridge 1",
            "cost": 100,
            "image": "./img/fridge_1.jpg",
            "currency": "$"
        },
        {
            "name": "fridge 2",
            "cost": 99,
            "image": "./img/fridge_2.png",
            "currency": "$"
        },
        {
            "name": "fridge 3",
            "cost": 50,
            "image": "./img/fridge_3.gif",
            "currency": "$"
        },
        {
            "name": "fridge 4",
            "cost": 120,
            "image": "./img/fridge_4.jpg",
            "currency": "$"
        },
        {
            "name": "fridge 5",
            "cost": 110,
            "image": "./img/fridge_5.jpg",
            "currency": "$"
        },
        {
            "name": "fridge 6",
            "cost": 90,
            "image": "./img/fridge_6.png",
            "currency": "$"
        },
        {
            "name": "fridge 7",
            "cost": 89,
            "image": "./img/fridge_1.jpg",
            "currency": "$"
        },
        {
            "name": "fridge 8",
            "cost": 150,
            "image": "./img/fridge_2.png",
            "currency": "$"
        },
        {
            "name": "fridge 9",
            "cost": 100,
            "image": "./img/fridge_3.gif",
            "currency": "$"
        },
        {
            "name": "fridge 10",
            "cost": 89,
            "image": "./img/fridge_4.jpg",
            "currency": "$"
        },
        {
            "name": "fridge 11",
            "cost": 100,
            "image": "./img/fridge_5.jpg",
            "currency": "$"
        }
    ];
    
    $scope.addItem = function(id) {
        if($scope.basket[id]) {
            $scope.basket[id]+=1;
        } else {
            $scope.basket[id] = 1;
        }
        $scope.update();
    };
    
    $scope.removeItem = function(id) {
        if($scope.basket[id]) {
           if($scope.basket[id] > 0) {
               $scope.basket[id]-=1;
           }
        }
        $scope.update();
    };
    
    $scope.clearBasket = function() {
        for(var key in $scope.basket) {
            delete $scope.basket;
            $scope.basket = {};
        }
        $scope.update();
    };
    
    $scope.getCount = function() {
        var sum = 0;
        for(var key in $scope.basket) {
            sum+= Number($scope.basket[key]);
        }
        return sum;
    };
    
    $scope.saveLocalStorage = function() {
        localStorage.setItem('basket', JSON.stringify($scope.basket));
    };
    
    $scope.getLocalStorage = function() {
        if(localStorage) {
            try {
                var res = JSON.parse(localStorage.getItem('basket'));
                if(res) {
                    $scope.basket = res;
                }
            } catch(e) {
                
            }
        }
        return false;
    };
    
    $scope.update = function() {
        $scope.countProducts = $scope.getCount();
        $scope.sumProducts = $scope.getSumm();
        if($scope.openPage == "store") {
            $scope.updatePage();
        }
    };
    
    $scope.updatePage = function() {
        $scope.itemsPage = [];
        for(var i = $scope.maxItems * ($scope.page - 1), l = i + $scope.maxItems, k = $scope.fridges.length; i < l && i < k; i+=1) {
            $scope.itemsPage.push($scope.fridges[i]);
        }
    };
    
    $scope.placeStore = function(page) {
        $scope.openPage = "store";
        $scope.page = page || 1;
        $scope.update();
    };
    
    $scope.placeBasket = function() {
        $scope.openPage = 'basket';
        $scope.update();
    };
    
    $scope.getArrPages = function() {
        var res = [];
        for(var i = 0, l = Math.ceil($scope.fridges.length / $scope.maxItems); i < l; i+=1) {
            res.push(i);
        }
        return res;
    };
    
    $scope.getSumm = function() {
        var sum = 0;
        for(var key in $scope.basket) {
            sum+= Number($scope.fridges[key].cost) * Number($scope.basket[key]);
        }
        return sum;
    };
    
    $scope.getLocalStorage();
    window.addEventListener("beforeunload", $scope.saveLocalStorage.bind($scope));
    $scope.update();
    
});