import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core';
var debounce = require('lodash.debounce');
import getCountries from "./fetchCountries.js"
const refs = {
  input: document.querySelector("input"),
  wrapper: document.querySelector(".wrapper"),
}



refs.input.addEventListener("input", debounce(searchCountry, 500))


function cardsMarkUp({ name }) {
  return ` <div class="card-wrapper">
      <div class="wrap-for-one-country">
        <p>${name}</p>
      </div>`

}
function cardsMarkUpForOneCountry({ name, capital, flag, languages, population }) {
  return ` <div class="card-wrapper">
      <div class="left-side">
        <p>${name}</p>
        <p>${capital}</p>
        <p>${languages.map((lang) => lang.name)}</p>
        <p>${population}</p>
      </div>
      <div class="right-side"><img src="${flag}" alt="flag"></div>
    </div>`
}
function moreTenCountries() {
  alert({
    text: "Please enter a more specific query!"
  });
}
function countriesNotFound() {
  error({
    text: "Please enter another name of country"
  });
}
function searchCountry(event) {
  refs.wrapper.innerHTML = ''
  event.preventDefault();
  const country = refs.input.value.trim();
  let cards = '';
  if (!country) {
    refs.wrapper.innerHTML = ''
    return
  }
  getCountries(country)
    .then((country) => {
      if (country.length > 2 && country.length < 11) {
        cardsMarkUp
        cards = country.map((dataItem) => cardsMarkUp(dataItem)).join("")
      } else if (country.length < 2) {
        cardsMarkUpForOneCountry
        cards = country.map((dataItem) => cardsMarkUpForOneCountry(dataItem)).join("")

      } else if (country.length > 11) {
        moreTenCountries()

      } else {
        countriesNotFound()
      }

      refs.wrapper.insertAdjacentHTML("beforeend", cards)


    })
}
