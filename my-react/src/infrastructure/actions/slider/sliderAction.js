export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_START = 'FETCH_START';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const RECEIVE_DATA = 'RECEIVE_DATA';

// export const fetchData = url => dispatch => {
//     dispatch(fetchStart())
//     return fetch(url)
//     .then(response => response.json())
//     .then(json => dispatch(receiveData(json)))
//     .catch(e => dispatch(fetchFailure('fetch failure')))
// }

export const fetchStart = () => ({
    type: FETCH_START,
})

export const fetchFailure = error => ({
    type: FETCH_FAILURE,
    error,
})

export const receiveData = data => ({
    type: RECEIVE_DATA,
    data,
})

export const fetchData = url => async dispatch => {
    dispatch(fetchStart())
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            dispatch(receiveData(data));
        } else {
            throw new Error('fetch failure');
        }
    } catch (e) {
        dispatch(fetchFailure('fetch failure'))
    }
}
