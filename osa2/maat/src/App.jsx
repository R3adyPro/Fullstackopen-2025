import { useEffect, useState } from 'react'
import countryServices from "./services/Countries"
import weatherServices from "./services/Weather"
import Filter from "./components/Filter"
import Country from "./components/Country"
import CountryData from "./components/CountryData"

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState('')
  const [capitalWeather, setCapitalWeather] = useState([])

  useEffect(() => {
    console.log('test')
    countryServices
      .getAll()
      .then(response => {
        setCountries(response.map(country => country))
      })
  }, [])
  
  const countryToShow = showAll
    ? countries
    : countries.filter(countries => countries.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  
  useEffect(() => {
    if(countryToShow.length === 1){
      weatherServices
        .getData(countryToShow[0].capital[0])
        .then(response => {console.log(response), setCapitalWeather(response)})
    }
  }, [countryToShow.length])
  
  const handleChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const handleClick = (country) => {
    setNewFilter(country.name.common)
  }

  return(
    <div>
      <Filter handleChange={handleChange}/>
      {countryToShow.length > 10 && <p>Too many matches, specify another filter</p>}
      {countryToShow.length <= 10 && countryToShow.length > 1 && 
        countryToShow.map(country => (
          <Country key={country.name.common} country={country} handleClick={handleClick} />
          ))
      }
      {countryToShow.length === 1 && <CountryData country={countryToShow[0]} weather={capitalWeather} />}
    </div>
  )
}

export default App
