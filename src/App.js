import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Weather from './components/Weather'
import SearchButton from './components/UI/SearchButton/SearchButton'
import SearchInput from './components/UI/SearchInput/SearchInput'
//import getWeather from './API/weatherService';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Loader from './components/UI/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import { fetchWeather } from './redux/actions'

function App() {
  //const [weatherType, setWeatherType] = useState('default') // should use
  const [query, setQuery] = useState('')
  //const [weather, setWeather] = useState()
  //const [loader, setLoader] = useState(true)

  const dispatch = useDispatch()
  const weather = useSelector((state) => {
    return state.weather.weather
  })

  const getCoords = () => {
    return new Promise((res) =>
      navigator.geolocation.getCurrentPosition(pos => res(pos.coords))
    )
  }

  const getImage = () => {
    //console.log('called') // fix each render call
    let type = ''
    if(weather.main){
      if(weather.main.temp < -10){
          type = type + 'extracold'
      } else if(weather.main.temp < 10){
          type = type + 'cold'
      } else if(weather.main.temp < 20){
          type = type + 'cool'
      } else if(weather.main.temp < 30){
          type = type + 'hot'
      } else {
          type = type + 'extrahot'
      }
      if(weather.weather[0].main === 'Thunderstorm'){
          type = 'coldRain'
      } else if(['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado', 'Drizzle'].includes(weather.weather[0].main)){
          type = type + 'Clouds'
      } else {
          type = type + weather.weather[0].main
      }
      return type
    }
    return 'default'
  }

  useEffect(() => {
    getCoords().then((coords) => {
        //getWeather(`lat=${coords.latitude}&lon=${coords.longitude}`, setQuery, setLoader, setWeather, setWeatherType)
        dispatch(fetchWeather(`lat=${coords.latitude}&lon=${coords.longitude}`))
    })
    //setTimeout(() => {setLoader(false)}, 10000)
  },[])
  
  const submitHandler = (e) => {
    e.preventDefault()
    //getWeather(('q='+query), setQuery, setLoader, setWeather, setWeatherType)
    dispatch(fetchWeather('q='+query))
    setQuery('')
  }

  return (
    <div className='App' style = {{backgroundImage: 'url('+ require(`./assets/${getImage()}.jpg`) +')' /* should not call it here */}}>
      <Loader /*loader = {loader}*//>
      <div className = 'main'>
        <form className='main__form' >
          <label className='main__form__label'>Your City:</label> 
          <SearchInput type='search' placeholder='Moscow' onChange={(e)=>{setQuery(e.target.value)}} value={query} />
          <SearchButton onClick={submitHandler}><FontAwesomeIcon icon={faSearch} /></SearchButton>
        </form>
        <Weather /*weather = {weather}*//>
      </div>
    </div>
  );
}

export default App;