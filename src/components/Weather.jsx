const Weather = (props) => {
  if(props.weather && props.weather.main && props.weather.name && props.weather.sys){
    return(
      <div className='main__weather'>
      <div className='main__weather-loc'>
        {props.weather.name}, {props.weather.sys.country}
      </div>
      <div className='main__weather-temp'>
        {Math.round(props.weather.main.temp)} °C
      </div>
      <div className='main__weather-desc'>
        {props.weather.weather[0].main}
      </div>
    </div>
  )
  } else if (props.weather) {
    return(
      <div className='err'>Putin was not here yet!</div>
    )
  } else {
    return ('')
  }
}

export default Weather 