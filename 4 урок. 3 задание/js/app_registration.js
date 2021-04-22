'use strict';

// Нахожу элементы: форму и инпуты в ней
let formEl = document.querySelector('.user-registration-form');
let formNameEl = document.querySelector('#form__name');
let formTelephoneEl = document.querySelector('#form__telephone');
let formMailEl = document.querySelector('#form__mail');

// Нахожу блоки, в которых буду выводить сообщение об ошибке ввода или пустое сообщение
let formNameMessageEl = document.querySelector('.form__message__name');
let formMailMessageEl = document.querySelector('.form__message__mail');
let formTelephoneMessageEl = document.querySelector('.form__message__telephone');

// Создаю переменные с рег. выражениями.
let regExpForFormName = new RegExp('^[а-яёА-ЯЁa-zA-Z]+$', 'g');
let regExpForFormMail = new RegExp('^[a-z.-]+@[a-z]+.([a-z]){2,4}$', 'g');
let regExpForFormTelephone = /^\+[7]\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/g;

// 20 строка, рег. выражение не работает, ошибка: "нечего повторять".
// let regExpForFormTelephone = new RegExp('^\+[7]\([0-9]{3}\)[0-9]{3}-[0-9]{4}$', 'g'); 

function showInputError (input, blockMessage, message) {
	input.style.border = '3px solid red';
	blockMessage.innerText = message;
	event.preventDefault();
}

function showGreenInput (input, blockMessage, message) {
	input.style.border = '3px solid green';
	blockMessage.innerText = message;
}

	formEl.addEventListener('submit', function(event) {
		if(!formNameEl.value.match(regExpForFormName) && formNameEl.style.border !== '3px solid red') {
			showInputError(formNameEl, formNameMessageEl, 'Имя должно содержать буквы от А до Я (без учёта регистра)');
		}
		else if (formNameEl.value.match(regExpForFormName)) {
			showGreenInput(formNameEl, formNameMessageEl, '');
		}
	});

	formEl.addEventListener('submit', function(event) {
		if(!formMailEl.value.match(regExpForFormMail) && formMailEl.style.border !== '3px solid red') {
			showInputError(formMailEl, formMailMessageEl, 'Формат почты: mymail@mail.ru или my.mail@mail.ru или my-mail@mail.ru');
		}
		else if (formMailEl.value.match(regExpForFormMail)) {
			showGreenInput(formMailEl, formMailMessageEl, '');
		}
	});

	formEl.addEventListener('submit', function(event) {
		if(!formTelephoneEl.value.match(regExpForFormTelephone) && formTelephoneEl.style.border !== '3px solid red') {
			showInputError(formTelephoneEl, formTelephoneMessageEl, 'Формат телефона: +7(000)000-0000');
		}
		else if(formTelephoneEl.value.match(regExpForFormTelephone)) {
			showGreenInput(formTelephoneEl, formTelephoneMessageEl, '');
		}
	});
