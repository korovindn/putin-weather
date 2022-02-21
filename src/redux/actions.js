import { FETCH_WEATHER, HIDE_LOADER, SHOW_LOADER } from "./types";

const config = {
    apiKey: "bac3d81f894d260e1b3ce2ddfab67d33",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}

export function fetchWeather (searchQuery) {
    return async dispatch => {
        dispatch(showLoader())
        const response = await fetch (`${config.baseUrl}weather?${searchQuery}&units=metric&APPID=${config.apiKey}`)
        const json = await response.json()
        dispatch({ type: FETCH_WEATHER, payload: json })
        dispatch(hideLoader())
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