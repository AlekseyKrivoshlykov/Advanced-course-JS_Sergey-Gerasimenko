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
    }

    addToCart (id) { 
        for(let i = 0; i < list.goods.length; i++) {
            if(id == list.goods[i].id) {
                const cartObj = new CartItem(list.goods[i]);
                this.items.push(cartObj);        
                this.renderCart(cartObj);
            }
        }
      }

    renderCart (object) {
        const modalBlock = document.querySelector('.modal__content');
        modalBlock.insertAdjacentHTML('beforeend', object.render());
    }

    funcPlus (id) {
        for(let j = 0; j < cartList.items.length; j++) {
            if(id == cartList.items[j].id) {
                let increaseObjectParams = cartList.items[j].increaseQuantity(cartList.items[j]);
                const divEl = document.querySelector('.cart-wrap');
                divEl.innerHTML = increaseObjectParams.render(increaseObjectParams);
            }
        }
    }

    funcMinus (id) {
        for(let j = 0; j < cartList.items.length; j++) {
            if(id == cartList.items[j].id) {
                let reduceObjectParams = cartList.items[j].reduceQuantity(cartList.items[j]);
                const divEl = document.querySelector('.cart-wrap');
                divEl.innerHTML = reduceObjectParams.render(reduceObjectParams);
            }
        }
    }

}

class CartItem extends ProductItem {
    constructor(title, price, id, img, quantity = 1) {
        super(title, price, id, img);
        this.quantity = quantity; 
    }
    render () {
        return `
        <div class="cart-wrap">
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
        </div>`

    }

    increaseQuantity (object) {
        for(let k of list.goods) {
            if(object.id == k.id) {
                this.quantity++;
                this.price = this.price + k.price;
                return object;
            }
        }

    }

    reduceQuantity (object) {
        if(this.quantity == 1) {
            return object;
        }
       for(let k of list.goods) {
            if(object.id == k.id) {
                this.quantity--;
                this.price = this.price - k.price;
                return object;
            }
        }
    }

}

let cartList = new Cart();

document.addEventListener('click', function (event) {
    if(event.target.classList.contains('buy-btn')) {
        cartList.addToCart(event.target.dataset.id); 
    }   
    if(event.target.classList.contains('fa-plus')) {
        cartList.funcPlus(event.target.parentNode.dataset.id);  
    }
    if(event.target.classList.contains('fa-minus')) {
        cartList.funcMinus(event.target.parentNode.dataset.id);  
    }

});

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
