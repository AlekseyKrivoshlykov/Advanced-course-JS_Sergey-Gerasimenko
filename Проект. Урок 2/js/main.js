'use strict';

class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    } 
    
    _fetchProducts() {
        this.goods = [
            {id: 1, imgSrc: 'images/catalog/product-1.jpg', title: 'ellery x m\'o capsule', price: 500},
            {id: 2, imgSrc: 'images/catalog/product-2.jpg', title: 'ellery x m\'o capsule', price: 700},
            {id: 3, imgSrc: 'images/catalog/product-3.jpg', title: 'ellery x m\'o capsule', price: 1000},
            {id: 4, imgSrc: 'images/catalog/product-4.jpg', title: 'ellery x m\'o capsule', price: 550},
            {id: 5, imgSrc: 'images/catalog/product-5.jpg', title: 'ellery x m\'o capsule', price: 700},
            {id: 6, imgSrc: 'images/catalog/product-6.jpg', title: 'ellery x m\'o capsule', price: 1560},
            {id: 7, imgSrc: 'images/catalog/product-7.jpg', title: 'ellery x m\'o capsule', price: 2650},
            {id: 8, imgSrc: 'images/catalog/product-8.jpg', title: 'ellery x m\'o capsule', price: 5450},
            {id: 9, imgSrc: 'images/catalog/product-9.jpg', title: 'ellery x m\'o capsule', price: 1370},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }

    calcSumProducts () {
        this.goods.forEach(product => {
           cartAmount += product.price;
        });
    }

}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.imgSrc;  
    }
    
    render() {
       return `<div class="product-item data-id="${this.id}">
       <img src="${this.img}" alt="product">
       <h3 class="item-for-sale-list-name">${this.title}</h3>
       <p class="item-for-sale-list-price">${this.price}</p>
       <button class="buy-btn"><img class="item-for-sale-list-btn-icon" src="images/button-cart-icon.svg" alt="button-cart-icon">Купить</button>
       </div>`
   }
}

let list = new ProductsList();
list.render();

let cartAmount = 0;
list.calcSumProducts();
console.log(cartAmount);

class Cart {
    constructor (wrap = '#') {
        this.wrap = '#';
        this.items = [];
    }

    addItem (item) {
        this.items.push(item);
    }

    deleteItem (item) {
        this.items.pop(item);
    }

    render() {
        
    }
}

class CartItem {
    constructor(item) {
        this.title = item.title;
        this.price = item.price;
        this.id = item.id;
        this.img = item.imgSrc;
        this.quantity = item.quantity; 
    }
    render () {

    }

    increaseQuantity (item) {
        this.quantity += quantity;
    }

    reduceQuantity (item) {
        if (this.quantity !== 1) {
            this.quantity -= quantity;
        } else {
            this.quantity = quantity;
        }
    }

    addToFavourites (item) {

    }
}
