// node ./tests/controller.js
import { faker } from '@faker-js/faker';



////////////////////////////////////////////
//////   Date and time for artefacts name
////////////////////////////////////////////
const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
export const dateTime = date+' '+time;
//console.log(dateTime)

const randomCompName = faker.person.zodiacSign() // 'Pisces'
//console.log(randomCompName);

export const randomCompAndTime = randomCompName + ' ' + dateTime;
//console.log(randomCompandTime);

