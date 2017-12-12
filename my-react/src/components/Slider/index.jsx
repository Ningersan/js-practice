import React, { Component } from 'react';
// import styles from './index.scss'
import './index.css'

class Slider extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div id="slider">
                <div className="img-list">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Slider
