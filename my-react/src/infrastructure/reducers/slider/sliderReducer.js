import { REQUEST_DATA, RECEIVE_DATA } from '../../actions/index'

const initState = {
    isFetching: false,
    imgData: [],

    // imgData: [
    //     {
    //         src: '../../static/img/coco-1.jpg',
    //         alt: 'coco',
    //     },
    //     {
    //         src: '../../static/img/coco-2.jpg',
    //         alt: 'coco',
    //     },
    //     {
    //         src: '../../static/img/coco-3.jpg',
    //         alt: 'coco',
    //     },
    //     {
    //         src: '../../static/img/coco-4.jpg',
    //         alt: 'coco',
    //     },
    //     {
    //         src: '../../static/img/coco-5.jpg',
    //         alt: 'coco',
    //     },
    // ]
}

const sliderReducer = function(state=initState, action) {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                ...state,
                isFetching: true,
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
