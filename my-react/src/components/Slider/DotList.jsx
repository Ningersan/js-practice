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

    render() {
        const { length, current, handleClick } = this.props;
        const getDotClasses = function(index) {
            return index === current ? "dot active" : "dot";
        }

        return (
            <ul className="dots">
                {
                    Array.from({length}).map(function (child, index) {
                        return  <li
                                  className={getDotClasses(index)} 
                                  key={index}
                                  onClick={handleClick(index)}
                                />
                    })
                }
            </ul>
        );
    }
}

export default DotList;
