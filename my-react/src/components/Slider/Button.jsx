import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired,
    }

    static defaultProps = {
        type: 'button',
    }

    constructor() {
        super();
    }

    render() {
        const { type, className, handleClick } = this.props;
        // const next = {'to-left': -1, 'to-right': 1}[className];
        return <button
            type={type}
            className={className}
            onClick={handleClick}
        />
    }
}

export default Button;
