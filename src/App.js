import {useState} from 'react';
import Weather from './components/Weather';
import SearchButton from './components/UI/SearchButton/SearchButton';
import SearchInput from './components/UI/SearchInput/SearchInput';

const config = {
  apiKey: "bac3d81f894d260e1b3ce2ddfab67d33",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [weatherType, setWeatherType] = useState('default')
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState()
  
  const getWeather = () => {
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
        } else if(['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado', 'Drizzle'].includes(res.weather[0].main)){
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

  const submitHandler = (e) => {
    e.preventDefault()
    getWeather()
  }

  return (
    <div className='App' style = {{backgroundImage: 'url('+ (require(`./assets/${weatherType}.jpg`) ? require(`./assets/${weatherType}.jpg`) : require('./assets/default.jpg'))+')'}}>
      <div className = 'main'>
        <form className='main__form' >
          <label className='main__form__label'>Your City:</label> 
          <SearchInput type='search' placeholder='Moscow' onChange={(e)=>{setQuery(e.target.value)}} value={query} />
          <SearchButton onClick={submitHandler}>Go!</SearchButton>
        </form>
        <Weather weather = {weather}/>
      </div>
    </div>
  );
}

export default App;