const config = {
    apiKey: "bac3d81f894d260e1b3ce2ddfab67d33",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const getWeather = (query, setQuery, setWeather, setWeatherType) => {
    fetch(`${config.baseUrl}weather?${query}&units=metric&APPID=${config.apiKey}`)
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

export default getWeather