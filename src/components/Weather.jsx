import { useSelector} from 'react-redux'

const Weather = () => {
  const weather = useSelector((state) => {
    return state.weather.weather
  })

  if(weather && weather.main && weather.name && weather.sys){
    return(
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
  )
  } else if (!(weather.cod === 200)) {
    return(
      <div className='err'>Putin was not here yet!</div>
    )
  } else {
    return ('')
  }
}

export default Weather 