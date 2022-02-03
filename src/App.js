import './App.css';
import {useState} from 'react';

const config = {
  apiKey: "bac3d81f894d260e1b3ce2ddfab67d33",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [weatherType, setWeatherType] = useState('default')
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState()
  
  const getWeather = (evt) => {
    if(evt.key === 'Enter'){
      fetch(`${config.baseUrl}weather?q=${query}&units=metric&APPID=${config.apiKey}`)
      .then(
        (res) => res.json(),
        (e) => {
          console.log(e)
      })
      .then(
        (res) => {
          setWeather(res)
          setQuery('')
          let type = ''
          if(res.main.temp < -10){
            type = type + 'extracold'
          } else if(res.main.temp < 10){
            type = type + 'cold'
          } else if(res.main.temp < 20){
            type = type + 'cool'
          } else if(res.main.temp < 30){
            type = type + 'hot'
          } else {
            type = type + 'extrahot'
          }
          if(res.weather[0].main === 'Thunderstorm'){
            type = 'coldRain'
          } else if(res.weather[0].main === 'Mist'){
            type = type + 'Clouds'
          } else {
            type = type + res.weather[0].main
          }
          setWeatherType(type)
        },
        (e) => {
          console.log(e)
        })
    }
  }
  return (
    <div className='App' style = {{backgroundImage: 'url('+ (require(`./assets/${weatherType}.jpg`) ? require(`./assets/${weatherType}.jpg`) : require('./assets/default.jpg'))+')'}}>
      <div className = 'main'>
        <label className='main__label'>
          Your City: 
          <input className='main__input' type='text' placeholder='Moscow' onChange={(e)=>{setQuery(e.target.value)}} value={query} onKeyPress={getWeather}>
          </input>
        </label>
       { weather && weather.main && weather.name && weather.sys ?
         <div className='main__weather'>
          <div className='main__weather-loc'>
            {weather.name}, {weather.sys.country}
          </div>
          <div className='main__weather-temp'>
            {Math.round(weather.main.temp)} °C
          </div>
          <div className='main__weather-desc'>
            {weather.weather[0].main}
          </div>
        </div>
        : weather ? 'Putin was not here yet!' : '' }
      </div>
    </div>
  );
}

export default App;
