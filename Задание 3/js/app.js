'use strict';

let burgersSize = [
{name: small_burger, price: 50, calories: 20},
{name: big_burger, price: 100, calories: 40},
];

let burgerStuffing = [
{name: cheese, price: 10, calories: 20},
{name: potato, price: 15, calories: 10},
{name: salad, price: 20, calories: 5}
];

let burgerTopping = [
{name: spice, price: 15, calories: 0},
{name: mayonnaise, price: 20, calories: 5},
];

class Hamburger {
	constructor(size, stuffing, topping) {
		this.size = document.querySelector('input[name=choose_burger]:checked').id;
		this.stuffing = document.querySelector('input[name=choose_filling]:checked').id;
		this.topping = this.getToppings(topping);
	}

	getToppings(name) {
		let result = [];
		let inputsEl = document.querySelectorAll('input[name=choose_topping]:checked');
		inputsEl.forEach(function(el) {
			result.push(el.id);
		});
		return result;
	}

	calcPrice () {
		let priceBurger = 0;
		let priceStuffing = 0;
		let priceTopping = 0;
		
		for(let i = 0; i < burgersSize.length; i++) {
			if(burgersSize[i].name.id == this.size) {
				priceBurger = burgersSize[i].price;
			}
		}
		for(let j = 0; j < burgerStuffing.length; j++) {
			if(burgerStuffing[j].name.id == this.stuffing) {
				priceStuffing = burgerStuffing[j].price;
			}
		}
		for(let k = 0; k < burgerTopping.length; k++) {
			for(let l = 0; l < this.topping.length; l++) {
				if(burgerTopping[k].name.id == this.topping[l]) {
					priceTopping += burgerTopping[k].price;
				}
			}
		}
		
		return priceBurger + priceStuffing + priceTopping;
	}

	calcCalories () {
		let caloriesBurger = 0;
		let caloriesStuffing = 0;
		let caloriesTopping = 0;

		for(let i = 0; i < burgersSize.length; i++) {
			if(burgersSize[i].name.id == this.size) {
				caloriesBurger = burgersSize[i].calories;
			}
		}
		for(let j = 0; j < burgerStuffing.length; j++) {
			if(burgerStuffing[j].name.id == this.stuffing) {
				caloriesStuffing = burgerStuffing[j].calories;
			}
		}
		for(let k = 0; k < burgerTopping.length; k++) {
			for(let l = 0; l < this.topping.length; l++) {
				if(burgerTopping[k].name.id == this.topping[l]) {
					caloriesTopping += burgerTopping[k].calories;
				}
			}
		}
		return caloriesBurger + caloriesStuffing + caloriesTopping;
	}
}

let btnEl = document.querySelector('.getSum');
let showResultEl = document.querySelector('.show_result_sum');

btnEl.addEventListener('click', function (e) {
	const burger = new Hamburger('size', 'stuffing', 'topping');
	showResultEl.innerText = `Стоимость бургера: ${burger.calcPrice(burger)} рублей. Количество калорий: ${burger.calcCalories(burger)} к/кал.`;
});
