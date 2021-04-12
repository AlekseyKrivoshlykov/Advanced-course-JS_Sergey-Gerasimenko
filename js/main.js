'use strict';

const products = [
    {id: 1, imgSrc: 'images/catalog/product-1.jpg', title: 'ellery x m\'o capsule', price: '$52'},
    {id: 2, imgSrc: 'images/catalog/product-2.jpg', title: 'ellery x m\'o capsule', price: '$52'},
    {id: 3, imgSrc: 'images/catalog/product-3.jpg', title: 'ellery x m\'o capsule', price: '$52'},
    {id: 4, imgSrc: 'images/catalog/product-4.jpg', title: 'ellery x m\'o capsule', price: '$52'},
    {id: 5, imgSrc: 'images/catalog/product-5.jpg', title: 'ellery x m\'o capsule', price: '$52'},
    {id: 6, imgSrc: 'images/catalog/product-6.jpg', title: 'ellery x m\'o capsule', price: '$52'},
    {id: 7, imgSrc: 'images/catalog/product-7.jpg', title: 'ellery x m\'o capsule', price: '$52'},
    {id: 8, imgSrc: 'images/catalog/product-8.jpg', title: 'ellery x m\'o capsule', price: '$52'},
    {id: 9, imgSrc: 'images/catalog/product-9.jpg', title: 'ellery x m\'o capsule', price: '$52'},
];

//Функция для формирования верстки каждого товара
const renderProduct = (item = {imgSrc: ' ', title: 'Перезагрузите страницу.', price: ' '}) => {
    return `<div class="product-item">
                <img src="${item.imgSrc}" alt="product">
                <h3 class="item-for-sale-list-name">${item.title}</h3>
                <p class="item-for-sale-list-price">${item.price}</p>
                <button class="buy-btn"><img class="item-for-sale-list-btn-icon" src="images/button-cart-icon.svg" alt="button-cart-icon">Купить</button>
            </div>`
};

const renderPage = (list = [{imgSrc: ' ', title: 'Перезагрузите страницу.', price: ' '}]) => {
    const productsList = list.map((item = {imgSrc: ' ', title: 'Перезагрузите страницу.', price: ' '}) => renderProduct(item));
    document.querySelector('.products').innerHTML = productsList.join(' ');
};

renderPage(products);