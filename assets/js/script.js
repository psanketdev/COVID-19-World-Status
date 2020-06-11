/*Authohr: Sanket Patil*/

console.log('This is a world covid-19 status');

'use strict';

let form = document.getElementById('myform');
let search = document.getElementById('submit');
let tableBody = document.getElementById('tableBody');
let countryData;

window.onload = function () {
  let loader = document.querySelector('.loader');
  loader.style.display = 'none';

  search.addEventListener('click', searchCountry);
  function searchCountry(e) {
    e.preventDefault();

    let inputValue = document.getElementById('inputValue').value;
    let url = `https://api.covid19api.com/dayone/country/${inputValue} `;

    fetch(url).then(function (response) {
      if (response.status == 200) {
        return response.json();
      }
    }).then(function (data) {
      countryData = data;
      if (inputValue == "") {
        alert('PLEASE ENTER A CORRECT COUNTRY NAME!');
        // tableBody.innerHTML = "";
      } else {
        formReset();
      }
      countryInfo();
      countryName();
    });
  }

  function countryInfo() {
    inputValue.innerHTML = "";
    formReset();

    let str = '';
    countryData.forEach(function (country) {
      str += `   <tr>
                <th scope="row">${country.Date.slice(0, 10)}</th>
                <td class="text-info">${country.Confirmed}</td>
                <td class="text-danger">${country.Deaths}</td>
                <td class="text-success">${country.Recovered}</td>
                <td class="text-warning">${country.Active}</td>
              </tr>`;
    });
    tableBody.innerHTML = str;
  }

  function formReset() {
    form.reset();
  }

  function countryName() {
    let countryName = document.getElementById('countryName');
      for (let name of countryData) {
        countryName.innerText = name.Country;
    }
  }
}