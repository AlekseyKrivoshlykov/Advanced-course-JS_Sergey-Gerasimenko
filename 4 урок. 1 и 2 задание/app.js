'use strict';

let regexp = new RegExp(/\B'|'\B/, 'g');
let pEl = document.querySelector('.paragraph');
pEl.innerText = pEl.innerText.replace(regexp, '"');
