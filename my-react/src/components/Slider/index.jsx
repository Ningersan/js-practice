import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DotList from './DotList';
import './index.css';

class Slider extends Component {
    static defaultProps = {
        speed: 3000,
        autoPlay: true,
        haveDots: true,
    }

    static propTypes = {
        speed: PropTypes.number.isRequired,
        autoPlay: PropTypes.bool.isRequired,
        haveDots: PropTypes.bool.isRequired,
    }

    constructor() {
        super();
        this.state = {
            offset: 0,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    tick(offset) {
        this.setState({
            offset,
        })
    }

    slide(offset) {
        const curOffset = this.state.offset;
        let nowOffset = curOffset + offset;
        const limit = (this.props.children.length - 1) * 100;

        if (nowOffset > 0) {
            nowOffset = -limit;
        } else if (nowOffset < -limit) {
            nowOffset = 0;
        }

        this.tick(nowOffset);
    }

    getDotClassName(index) {
        const { offset } = this.state;
        return index === -(offset / 100) ? "dot active" : "dot";
    }

    handleClick(offset) {
        return function(e) {
            const strategies = {
                'li': this.tick, 
                'button': this.slide
            };
            const nodeName = e.target.nodeName.toLowerCase();
            strategies[nodeName].call(this, offset);
        }.bind(this);
    }

    componentDidMount() {
        if (this.props.autoPlay) {
            this.timer = setInterval(() => this.slide(-100), this.props.speed);
        }
    }

    componentWillUnmount() {
        if (this.props.autoPlay) {
            clearInterval(this.timer);
        }
    }

    render() {
        const { imgData } = this.props;
        const listStyle = { left: `${this.state.offset}%` };

        return (
            <div id="slider">
                <div className="img-list" style={listStyle}>
                    {React.Children.map(this.props.children, child => child)}
                </div>
                {
                    this.props.haveDots &&
                    <DotList
                    offset={this.state.offset}
                    length={this.props.children.length}
                    handleClick={this.handleClick}
                    />
                }
                <button className="to-left" onClick={this.handleClick(100)} />
                <button className="to-right" onClick={this.handleClick(-100)} />
            </div>
        )
    }
}

export default Slider;
