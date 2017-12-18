import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DotList from './DotList';
import './index.css';

class Slider extends Component {
    static defaultProps = {
        speed: 3000,
        autoPlay: false,
        allowPause: false,
        allowTouch: false,
        haveDots: true,
    }

    // static propTypes = {
    //     imgData: PropTypes.array,
    //     speed: PropTypes.number.isRequired,
    //     autoPlay: PropTypes.bool.isRequired,
    //     allowPause: PropTypes.bool.isRequired,
    //     haveDots: PropTypes.bool.isRequired,
    // }

    constructor() {
        super();
        this.state = {
            // offset: 0,
            prev: 0,
            current: 0,
            direction: 'stop',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    tick(next) {
        const { current } = this.state;
        let direction = next > current ? 'forward' : 'backward';
        if (next >= this.props.imgData.length ) {
            direction = 'forward';
        }
        this.setState({prev: current, current: next, direction})
        // this.setState({
        //     offset,
        // })
    }

    slide(next) {
        const { current } = this.state;
        const limit = this.props.imgData.length
        let pos = current + next;
        if (pos >= limit) {
            pos = 0;
        } else if (pos < 0) {
            pos = limit;
        }
        this.tick(pos);
        // const curOffset = this.state.offset;
        // let nowOffset = curOffset + offset;
        // const limit = (this.props.imgData.length - 1) * 100;

        // if (nowOffset > 0) {
        //     nowOffset = -limit;
        // } else if (nowOffset < -limit) {
        //     nowOffset = 0;
        // }

        // this.tick(nowOffset);
    }

    autoPlay() {
        if (this.props.autoPlay) {
            this.timer = setInterval(() => this.slide(1), this.props.speed);
        }
    }

    pause() {
        if (this.props.autoPlay) {
            clearInterval(this.timer);
        }
    }

    getItemClassName(index) {
        const { current, prev } = this.state;
        if (index === current) {
            return 'slider-item-current';
        } else if (index === prev && prev !== current) {
            return 'slider-item-prev';
        }
    }

    getDotClassName(index) {
        // const { offset } = this.state;
        // return index === -(offset / 100) ? "dot active" : "dot";
    }

    handleClick(offset) {
        return function(e) {
            const strategies = { 'li': this.tick, 'button': this.slide };
            const nodeName = e.target.nodeName.toLowerCase();
            strategies[nodeName].call(this, offset);
        }.bind(this);
    }

    handleMouseUp() {
        if (this.props.allowTouch) {
            if (this.readyTouchSlide) {
                const offset = { 'left': -100, 'right': 100, }[this.touchDirection];
                this.slide(offset);
            }
            this.readyTouchSlide = false;
        }
    }

    handleMouseDown(e) {
        if (this.props.allowTouch) {
            // 禁用浏览器默认的拖拽图片事件
            e.preventDefault();
            this.readyTouchSlide = true;
            this.currentMouseX = e.pageX;
        }
    }

    handleMouseOver() {
        if (this.props.allowPause) {
            this.pause();
        }
    }

    handleMouseMove(e) {
        if (this.props.allowTouch && this.readyTouchSlide) {
            const offset = e.pageX - this.currentMouseX;
            if (Math.abs(offset) > 50) {
                this.touchDirection = offset < 0 ? 'left' : 'right';
            }
        }
    }

    handleMouseOut() {
        if (this.props.allowPause && this.props.autoPlay) {
            this.autoPlay();
        }
    }

    componentDidMount() {
        this.autoPlay();
    }

    componentWillUnmount() {
        // this.pause();
    }

    render() {
        const { imgData } = this.props;
        const className = `slider-screen slider-${this.state.direction}`;
        // const listStyle = { left: `${this.state.offset}%` };

        return (
            <div id="slider">
                <div
                  className={className}
                //   style={listStyle}
                  onMouseUp={this.handleMouseUp}
                  onMouseDown={this.handleMouseDown}
                  onMouseOver={this.handleMouseOver}
                  onMouseMove={this.handleMouseMove}
                  onMouseOut={this.handleMouseOut}
                >
                    {
                        imgData.map((img, index) =>
                        <img
                          key={index}
                          className={this.getItemClassName(index)}
                          src={img.src}
                          alt={img.alt}
                        />)
                    }
                </div>
                {
                    this.props.haveDots &&
                    <DotList
                        // offset={this.state.offset}
                        current={this.state.current}
                        length={imgData.length}
                        handleClick={this.handleClick}
                    />
                }
                <button className="to-left" onClick={this.handleClick(-1)} />
                <button className="to-right" onClick={this.handleClick(1)} />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
)(Slider);

function mapStateToProps(state) {
    return {
        imgData: state.sliderReducer.imgData,
    }
}
