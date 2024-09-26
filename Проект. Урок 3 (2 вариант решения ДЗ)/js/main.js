'use strict';

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
        } 

        _getProducts(){
            return fetch(`../responses/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
        }

        render() {
            const block = document.querySelector(this.container);
            for(let product of this.goods){
                const productObj = new ProductItem(product);
                block.insertAdjacentHTML('beforeend', productObj.render());
            }
        }

        calcSumProducts () {
            this.goods.forEach(product => {
               cartAmount += product.price;
           });
        }

        addEventOnBtn () {
            let buyButtons = document.querySelectorAll('.buy-btn');
            buyButtons.forEach(function(btn) {
                btn.addEventListener('click', list.addToCart);
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
           return `<div class="product-item">
           <img src="${this.img}" alt="product">
           <h3 class="item-for-sale-list-name">${this.title}</h3>
           <p class="item-for-sale-list-price">${this.price}</p>
           <button data-id="${this.id}" class="buy-btn"><img class="item-for-sale-list-btn-icon" src="images/button-cart-icon.svg" alt="button-cart-icon">Купить</button>
           </div>`
       }
   }

   let list = new ProductsList();
   list.render();


   class Cart {
    constructor (items) {
        this.items = [];
        this._getCartItems()
            .then(cartData => { //cartData - объект js
                this.items = {...cartData};
                this.render()
            });
    }

     _getCartItems(){
            return fetch(`../responses/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
        }

        render() {
            const modalBlock = document.querySelector('.modal__content');
            for(let item of this.items.contents){
                const cartObj = new CartItem(item);
                modalBlock.insertAdjacentHTML('beforeend', cartObj.render());
            }
         
            let spanCartAmount = document.createElement('span');
            spanCartAmount.classList.add('span__cart__amount');
            spanCartAmount.innerHTML = `Сумма товаров: ${this.items.amount} рублей.`;
            modalBlock.insertAdjacentElement('beforeend', spanCartAmount);

            let spanCartQuantity = document.createElement('span');
            spanCartQuantity.classList.add('span__cart__quantity');
            spanCartQuantity.innerHTML = `Общее кол-во товаров: ${this.items.countGoods}.`;
            modalBlock.insertAdjacentElement('beforeend', spanCartQuantity);   
        }

}

class CartItem extends ProductItem {
    constructor(title, price, id, img, quantity) {
        super(title, price, id, img);
        this.quantity = quantity; 
    }

    render () {
        return `
        <div class="cart-item">
        <img src="${this.img}" alt="product">
        <h3 class="item-for-sale-list-name">${this.title}</h3>
        <p class="item-quantity">Количество товара: ${this.quantity}</p>
        <p class="item-for-sale-list-price">${this.price}</p>
        <div class="btn-cart-wrap">
        <button class="minus-btn" data-id="${this.id}"><i class="fas fa-minus"></i></button>
        <button class="trash-btn" data-id="${this.id}"><i class="fas fa-trash-alt"></i></button>
        <button class="plus-btn" data-id="${this.id}"><i class="fas fa-plus"></i></button>
        </div>
        </div>
        `
    }
}

let cartList = new Cart();

let modalCart = document.querySelector('.modal__cart');
let cartBtn = document.querySelector('.cart');
let modalCloseBtn = document.querySelector('.modal__close');

cartBtn.addEventListener('click', function (event) {
    modalCart.style.display = 'block';
});

modalCloseBtn.addEventListener('click', function (event) {
    modalCart.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if(event.target == modalCart) {
        modalCart.style.display = 'none';
    }
});
