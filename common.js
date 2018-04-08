window.onload = function() {
    
    function Basket() {
        this.items = {};
    }
    
    Basket.prototype.add = function(id) {
        if(this.items[id]) {
            this.items[id]+=1;
        } else {
            this.items[id] = 1;
        }
    };
    
    Basket.prototype.removeItem = function(id) {
        if(this.items[id]) {
           if(this.items[id] > 0) {
               this.items[id]-=1;
           }
        }
    };
    
    Basket.prototype.clear = function() {
        for(var key in this.items) {
            delete this.items;
            this.items = {};
        }
    };
    
    Basket.prototype.getCount = function() {
        var sum = 0;
        for(var key in this.items) {
            sum+= Number(this.items[key]);
        }
        return sum;
    };
    
    function Store() {
        this.content = document.getElementById("content");
        this.fridges = this.getBase();
        this.basket = new Basket();
        this.itemsOnPage = 6;
        this.getLocalStorage();
        this.numPage = 0;
        
        window.addEventListener("beforeunload", this.saveLocalStorage.bind(this));
    }
    
    Store.prototype.saveLocalStorage = function() {
        localStorage.setItem('basket', JSON.stringify(this.basket.items));
    };
    
    Store.prototype.getLocalStorage = function() {
        if(localStorage) {
            try {
                var res = JSON.parse(localStorage.getItem('basket'));
                if(res) {
                    this.basket.items = res;
                }
            } catch(e) {
                
            }
        }
        return false;
    };
    
    Store.prototype.update = function(id) {
        var count = this.basket.getCount(),
            tag = this.getTagBasketCount();
        if(count > 0) {
            tag.innerHTML = count;
            tag.style.display = "block";
        } else {
            tag.style.display = "none";
        }
        
        if(this.openPage == "basket") {
            try {
                this.placeBasketHtml();
            } catch(e) {
                
            }
        }
    };
    
    Store.prototype.getTagBasketCount = function() {
        if(!this.tagBasketCount) {
            this.tagBasketIcon = document.getElementById("basket-count");
        }
        return this.tagBasketIcon;
    };
    
    Store.prototype.placeStore = function(page) {
        var str = "",
            p = (page || 1) - 1;
        this.numPage = p;
        for(var i = this.itemsOnPage * p, arr = this.fridges, l = arr.length, k = this.itemsOnPage * (p + 1); i < k & i < l; i+=1) {
            var elem = arr[i];
            str+='<div class="block-product">' + '<img src="' + elem.image + '" alt="' + elem.image + '"><h3 class="product-name">' + elem.name + '</h3><spam class="cost">' + elem.cost + elem.currency + '</spam><button class="ctrl-basket-buttons" onclick="store.addItem(' + i + ');">Добавить в корзину</button></div>';
        }
        str+=this.getButtons();
        this.content.innerHTML = str;
        this.openPage = "store";
        this.update();
    };
    
    Store.prototype.getButtons = function() {
        var str = '';
        if(this.fridges.length > this.itemsOnPage) {
            str+='<div class="wrap-page-buttons">'
            for(var i = 1, l = Math.ceil(this.fridges.length / this.itemsOnPage) + 1; i < l; i+=1) {
                str+='<a href="#" ' + ((i - 1 == this.numPage) ? "class=select" : "")  + ' onclick="store.placeStore(' + i +')">' + i + '</a>';
            }
            str+='</div>';
        }
        return str;
    };
    
    Store.prototype.getBasketPanel = function() {
        var str = '<div class="total-amount">Общая сумма <span>' + this.getSumm() + '$</span></div><button class="ctrl-basket-buttons clear-button" onclick="store.clearBasket();">Очистить корзину</button><button class="ctrl-basket-buttons order-button">Сделать заказ</button>';
        return str;
    };
    
    Store.prototype.placeBasket = function() {
        this.placeBasketHtml();
        this.update();
    };
    
     Store.prototype.placeBasketHtml = function() {
        var str = "",
            check = 0;
        for(var key in this.basket.items) {
            var count = this.basket.items[key];
            if(count > 0) {
                var elem = this.fridges[key];
                str+='<div class="block-product">' + '<img src="' + elem.image + '" alt="' + elem.image + '"><h3 class="product-name">' + elem.name + '</h3><spam class="cost">' + elem.cost + elem.currency + '</spam><div class="wrap-buttons"><button class="ctrl-basket-buttons" onclick="store.removeItem(' + key + ');">-</button><span id="count-product-' + key + '">x' + count + '</span><button class="ctrl-basket-buttons" onclick="store.addItem(' + key + ');">+</button></div><spam class="cost x-cost">' + (elem.cost * count) + elem.currency + '</spam></div>';
                check+=1;
            }
        }
         if(!(check > 0)) {
             str = '<div class="basket-is-empty">Ваша корзина пуста</div> <button class="ctrl-basket-buttons" onclick="store.placeStore();">Вернуться в магазин</button>';
         } else {
             str+= this.getBasketPanel();
         }
        this.content.innerHTML = str;
         this.openPage = "basket";
    };
    
    Store.prototype.getBase = function() {
        return dataBase.fridges;
    };
    
    Store.prototype.clearContent = function() {
        content.innerHTML = "";
    };
    
    Store.prototype.addItem = function(id) {
        this.basket.add(id);
        this.update();
    };
    
    Store.prototype.removeItem = function(id) {
        this.basket.removeItem(id);
        this.update();
    };
    
    Store.prototype.clearBasket = function() {
        this.basket.clear();
        this.update();
    };
    
    Store.prototype.getSumm = function() {
        var sum = 0;
        for(var key in this.basket.items) {
            sum+= Number(this.fridges[key].cost) * Number(this.basket.items[key]);
        }
        return sum;
    };
    
    window.store = new Store();
    
    store.placeStore();
};