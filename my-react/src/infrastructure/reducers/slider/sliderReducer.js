const initState = {
    status: 'PENDDING',
    imgData: [
        {
            src: '../../static/img/coco-1.jpg',
            alt: 'coco',
        },
        {
            src: '../../static/img/coco-2.jpg',
            alt: 'coco',
        },
        {
            src: '../../static/img/coco-3.jpg',
            alt: 'coco',
        },
        {
            src: '../../static/img/coco-4.jpg',
            alt: 'coco',
        },
        {
            src: '../../static/img/coco-5.jpg',
            alt: 'coco',
        },
    ]
}

const sliderReducer = function(state=initState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default sliderReducer;
