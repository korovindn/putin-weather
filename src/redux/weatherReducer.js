import { FETCH_WEATHER } from "./types"

const initialState = {
    weather: {}
}

export const weatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_WEATHER:
            return {...state, weather: action.payload}
        default: return state
    }
}