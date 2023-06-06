"use strict";

const cities = require('cities');
let myCity = cities.zip_lookup('10016');
console.log(myCity);

const addModule = require('./addNum');
let result = addModule.addNum(50, 60);
console.log(result);

