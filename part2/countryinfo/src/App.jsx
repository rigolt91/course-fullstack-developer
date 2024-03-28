import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather';

const ListCountries = ({ countries, handleClickShowCountry }) => {
  return (
    <div>
      {countries.map(country => (
          <div key={country.name.official}>
            {country.name.official}
            <button onClick={() => handleClickShowCountry(country)}>Show</button>
          </div>
      ))}
    </div>
  );
}

const Weather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .find(lat, lon)
      .then(returnedLanLon => {
        setWeather(returnedLanLon)
      })
  }, [lat, lon])

  const convertToCelsius = (temp) => {
    let temperature = parseFloat(temp) - 273.15
    return temperature.toFixed(2)
  }

  return (
    <>
      {weather
        ? (<>
            <h2>Weather in {weather.name}</h2>
            <div>Temperature {convertToCelsius(weather.main.temp)}° C</div>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description} 
              height="100"
            />
            <div>Wind {weather.wind.speed} m/s</div>
          </>)
        : <div>Loading weather...</div>
      }
    </>
  )
}

const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.values(languages).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
  )
}

const ShowCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name.official}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather 
        lat={country.capitalInfo.latlng[0]}
        lon={country.capitalInfo.latlng[1] }
      />
    </div>
  );
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    countriesService
      .all()
      .then(countries => {
        setCountries(countries)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleChangeCountry = (event) => {
    const returnedCountries = countries.filter(
      country => country.name.official.toLowerCase().includes(event.target.value.toLowerCase())
    )

    setShowCountry(returnedCountries)
  }

  const handleClickShowCountry = (country) => {
    setShowCountry([country])
  }

  return (
    <>
      <div>
        <label>Find Countries </label>
        <input 
          type="search" 
          onChange={handleChangeCountry}
          disabled={loading && 'disabled'}
          placeholder={loading ? 'loading...' : 'search...'}
        />

        {showCountry.length > 10
          ? <div>Too many matches, specify another filter</div>
          : showCountry.length > 1 && 
            <ListCountries countries={showCountry} handleClickShowCountry={handleClickShowCountry} />
        }

        {showCountry.length === 1 &&
          <ShowCountry country={showCountry[0]} />
        }
      </div>
    </>
  )
}

export default App
