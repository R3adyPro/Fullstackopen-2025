const countryData = ({ country, weather }) => {
    console.log(country, weather.main.temp)

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h1>Lanquages</h1>
            <ul>
                {Object.values(country.languages).map(i => <li>{i}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            <h1>Weather in {country.capital}</h1>
            <p>Tempature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default countryData