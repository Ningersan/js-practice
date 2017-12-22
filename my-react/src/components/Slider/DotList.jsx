import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DotList extends Component {
    static propTypes = {
        current: PropTypes.number.isRequired,
        length: PropTypes.number.isRequired,
        handleClick: PropTypes.func.isRequired,
    }

    constructor() {
        super();
    }

    getDotClasses(index) {
        const { current } = this.props;
        return index === current ? "slider-dot active" : "slider-dot";
    }

    render() {
        const { length, handleClick } = this.props;

        return (
            <ul className="slider-dots-wrap">
                {
                    Array.from({length}).map((child, index) => (
                        <li
                            key={index}
                            className={this.getDotClasses(index)}
                            onClick={handleClick(index)}
                        />
                    ))
                }
            </ul>
        );
    }
}

export default DotList;
