import { FETCH_WEATHER, SET_IMAGE, HIDE_LOADER, SHOW_LOADER } from "./types";

const config = {
    apiKey: "bac3d81f894d260e1b3ce2ddfab67d33",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}

export function fetchWeather (searchQuery) {
    return async dispatch => {
        dispatch(showLoader())
        const response = await fetch (`${config.baseUrl}weather?${searchQuery}&units=metric&APPID=${config.apiKey}`)
        const json = await response.json()
        if(json.sys.country == 'UA'){
            json.sys.country = 'RU'
        }
        dispatch({ type: FETCH_WEATHER, payload: json })
        if(!json.cod){
            const image = getImage(json)
            //image.onload = function () {
            dispatch({type: SET_IMAGE, payload: image })
        }
        dispatch(hideLoader())
        //}
    }
}

export function showLoader () {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader () {
    return {
        type: HIDE_LOADER
    }
}

export function getImage (weather) {
    let type = ''
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
    //const image = new Image()
    let image/*.src*/ = require(`../assets/${type}.jpg`)
    return image
}