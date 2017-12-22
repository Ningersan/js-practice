import { FETCH_FAILURE, RECEIVE_DATA, FETCH_START } from '../../actions/'

const initState = {
    isFetching: false,
    message: 'pedding',
    imgData: [],
}

const sliderReducer = function(state=initState, action) {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.error,
            }
        case RECEIVE_DATA:
            return {
                ...state,
                isFetching: false,
                imgData: action.data,
            }
        default:
            return state;
    }
}

export default sliderReducer;
