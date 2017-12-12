import React, { Component } from 'react';
// import styles from './index.scss'
import './index.css'

class Slider extends Component {
    constructor() {
        super()
        this.state = {
            offset: 0,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    tick(offset) {
        this.setState((prevState) => ({
            offset: prevState.offset + offset
        }))
    }

    slide() {
        const { offset } = this.state
        if (offset <= 0 && offset > -400) {
            this.tick(-100)
        } else if (offset <= -400) {
            this.tick(400)
        } else {
            this.tick(-400)
        }
    }

    handleClick(e) {
        var offset = {'to-left': 100, 'to-right': -100}
        this.tick(offset[e.target.className])
    }

    componentDidMount() {
        this.timer = setInterval(() => this.slide(), 2000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        var listStyle = { left: `${this.state.offset}%` };
        return (
            <div id="slider">
                <div className="img-list" style={listStyle}>
                    {this.props.children}
                </div>
                <button className='to-left' onClick={this.handleClick}></button>
                <button className='to-right' onClick={this.handleClick}></button>
            </div>
        )
    }
}

export default Slider
