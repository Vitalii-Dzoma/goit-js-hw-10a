import './css/styles.css';
import "./fetchCountries.js"
import { fetchExport } from './fetchCountries.js';
import { debounce } from 'lodash';

export const galleryUl = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;
    const inputData = document.querySelector("#search-box");




function onSearch(e) {
console.log(inputData.value)
  inputData.value.trim()
fetchExport(inputData.value)

    if (!inputData.value) {
        return;
    }
  

}



// function moreThenTenCountries() {
//     if ()
// }
  
inputData.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY))
