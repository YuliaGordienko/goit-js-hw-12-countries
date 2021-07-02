export default
    function getCountries(country) {
    return fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res) => res.json())
}