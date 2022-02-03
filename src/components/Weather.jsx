const Weather = (props) => {
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
}

export default Weather 