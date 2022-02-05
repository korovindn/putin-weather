import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Weather from './components/Weather';
import SearchButton from './components/UI/SearchButton/SearchButton';
import SearchInput from './components/UI/SearchInput/SearchInput';
import getWeather from './API/weatherService';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loader from './components/UI/Loader/Loader';

function App() {
  const [weatherType, setWeatherType] = useState('default')
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState()
  const [loader, setLoader] = useState(true)

  const getCoords = () => {
    return new Promise((res) =>
      navigator.geolocation.getCurrentPosition(pos => res(pos.coords))
    )
  }

  useEffect(() => {
    getCoords().then((coords) => {
        getWeather(`lat=${coords.latitude}&lon=${coords.longitude}`, setQuery, setLoader, setWeather, setWeatherType)
    })
    setTimeout(() => {setLoader(false)}, 10000)
    
  },[])
  
  const submitHandler = (e) => {
    e.preventDefault()
    getWeather(('q='+query), setQuery, setLoader, setWeather, setWeatherType)
  }

  return (
    <div className='App' style = {{backgroundImage: 'url('+ (require(`./assets/${weatherType}.jpg`) ? require(`./assets/${weatherType}.jpg`) : require('./assets/default.jpg'))+')'}}>
      <Loader loader = {loader}/>
      <div className = 'main'>
        <form className='main__form' >
          <label className='main__form__label'>Your City:</label> 
          <SearchInput type='search' placeholder='Moscow' onChange={(e)=>{setQuery(e.target.value)}} value={query} />
          <SearchButton onClick={submitHandler}><FontAwesomeIcon icon={faSearch} /></SearchButton>
        </form>
        <Weather weather = {weather}/>
      </div>
    </div>
  );
}

export default App;