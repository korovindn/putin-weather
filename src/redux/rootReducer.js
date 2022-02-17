import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { weatherReducer } from './weatherReducer'

export const rootReducer = combineReducers({
    weather: weatherReducer,
    app: appReducer
})