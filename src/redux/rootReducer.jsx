import {combineReducers, createStore} from 'redux'
import { DSSVReducer } from './reducer/DSSVReducer'

const rootReducer = combineReducers({
    DSSVReducer,
})

export const store = createStore(rootReducer) 