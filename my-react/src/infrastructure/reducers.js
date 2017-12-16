import { combineReducers } from 'redux'
import * as bizReducers from './reducers/'

const reducers = combineReducers({
    ...bizReducers
})

export default reducers;