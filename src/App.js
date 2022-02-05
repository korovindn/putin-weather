import {useState, useEffect} from 'react';
import Weather from './components/Weather';
import SearchButton from './components/UI/SearchButton/SearchButton';
import SearchInput from './components/UI/SearchInput/SearchInput';
import getWeather from './API/weatherService';

function App() {
  const [weatherType, setWeatherType] = useState('default')
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState()

  const getCoords = () => {
    return new Promise((res) =>
      navigator.geolocation.getCurrentPosition(pos => res(pos.coords))
    )
  }

  useEffect(() => {
    getCoords().then((coords) => {
        getWeather(`lat=${coords.latitude}&lon=${coords.longitude}`, setQuery, setWeather, setWeatherType)
    })
  },[])
  
  const submitHandler = (e) => {
    e.preventDefault()
    getWeather(('q='+query), setQuery, setWeather, setWeatherType)
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