import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DotList extends Component {
    static propTypes = {
        offset: PropTypes.number.isRequired,
        length: PropTypes.number.isRequired,
        handleClick: PropTypes.func.isRequired,
    }

    constructor() {
        super();
    }

    render() {
        const { length, offset, handleClick } = this.props;
        const getDotClasses = function(index) {
            return index === -(offset / 100) ? "dot active" : "dot";
        }

        return (
            <ul className="dots">
                {
                    Array.from({length}).map(function (child, index) {
                        return  <li
                                  className={getDotClasses(index)} 
                                  key={index}
                                  onClick={handleClick(-index * 100)}
                                />
                    })
                }
            </ul>
        );
    }
}

export default DotList;
