// * all country data load
async function loadData() {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await response.json()
    displayCountry(data);
}
loadData();

// * display country on UI
const displayCountry = countries => {
    const displayCountries = document.querySelector('.display-countries');
    countries.forEach(country => {
        const countryInfo = `
            <h2>${country.name}</h2>
            <p>${country.capital}</p>
            <button id="more-details" onclick = moreDetails('${country.name}')>More Details</button>
        `;
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country-div';
        countryDiv.innerHTML = countryInfo;
        displayCountries.appendChild(countryDiv);
    });
}

//* load extra information about country
const moreDetails = name => {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMoreDetails(data[0]))
        .catch(error => alert('could not find detail'))
}

// *display extra information
const displayMoreDetails = country => {
    const moreDetails = document.querySelector('.more-details');
    document.querySelector('.pop-up').style.visibility = 'visible';
    document.getElementById('back').style.visibility = 'visible';
    const countryInfo = `
        <h1>${country.name}</h1>
        <h2>Population: ${country.population}</h2>
        <h3>Area: ${country.area} kilometer</h3>
        <img src = "${country.flag}">
    `;
    moreDetails.innerHTML = countryInfo;
}

// * hide extra information div
document.getElementById('back').addEventListener('click', function () {
    document.querySelector('.pop-up').style.visibility = 'hidden';
    document.getElementById('back').style.visibility = 'hidden';
})
