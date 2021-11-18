import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from "./fetchCountries.js"
const galleryUl = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;
const inputData = document.querySelector("#search-box");




function onSearch(e) {
    const searchQuery = inputData.value;
    if (!searchQuery.trim()) {
            return;
        }
    API.fetchExport(searchQuery)
    .then(data => {
        console.log(data.length)
        
            if (data.length > 10) {
            
               Notify.info("Too many matches found. Please enter a more specific name.")
               return option = '';

            }
            if (data.length < 10 && data.length > 1) {
               return data.map(({ capital, name, population, languages, flags, }) =>
                  `<img src="${flags.svg}" alt="${name.official}" class="county-flag" width="30px">
                <p class="country-name">${name.official}</p>`
               ).join('')
            }
            return data.map(({ capital, name, population, languages, flags, }) =>
               `<div class="county-items">
       <div class="img-container">
            <img src="${flags.svg}" alt="${name.official}" class="county-flag" width="30px">
                <p class="country-name">${name.official}</p>
            <p>
                <span class="country-population">Population:${population}</span>
                    <p class="country-lanquages">Languages:${Object.values(languages)}</p>
                        <p class="country-capital">Capital:${[...capital]}</p>
     
            </p>
        </div>
    </div>`
               
      
            ).join('')
    })
     .then((resp) => { galleryUl.innerHTML = resp })
        .catch(err => { galleryUl.innerHTML = '', Notify.failure("Oops, there is no country with that name"); return })


}


  
inputData.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY))
