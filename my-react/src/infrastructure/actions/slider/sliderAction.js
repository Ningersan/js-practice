export const FETCH_DATA = 'FETCH_DATA';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const fetchData = url => dispatch => {
    return fetch(url, {method: 'GET', mode: 'cors'})
    .then(response => console.log(response))
        // .then(response => response.json())
        // .then(json => dispatch(receiveData(json)))
}

export function requestData(url) {
    return {
        type: REQUEST_DATA,
        url,
    }
}

export function receiveData(data) {
    return {
        type: RECEIVE_DATA,
        data,
    }
}
