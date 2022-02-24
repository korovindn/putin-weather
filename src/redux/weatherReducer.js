import { FETCH_WEATHER, SET_IMAGE } from "./types"

const initialState = {
    weather: {},
    image: require('../assets/default.jpg')
}

export const weatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_WEATHER:
            return {...state, weather: action.payload}
        case SET_IMAGE:
            return {...state, image: action.payload}
        default: return state
    }
}