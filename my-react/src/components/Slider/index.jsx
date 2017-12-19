import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DotList from './DotList';
import Button from './Button';
import './index.css';

class Slider extends Component {
    static defaultProps = {
        speed: 3000,
        autoPlay: true,
        allowPause: true,
        allowTouch: true,
        haveDots: true,
        haveButtons: true,
    }

    static propTypes = {
        imgData: PropTypes.array.isRequired,
        speed: PropTypes.number.isRequired,
        autoPlay: PropTypes.bool.isRequired,
        allowPause: PropTypes.bool.isRequired,
        haveDots: PropTypes.bool.isRequired,
        haveButtons: PropTypes.bool.isRequired,
    }

    constructor() {
        super();
        this.state = {
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

    moveTo(next) {
        const { current } = this.state;
        const length = this.props.imgData.length;
        let direction = next > current ? 'forward' : 'backward';

        if (next >= length) {
            direction = 'forward';
            next = 0;
        } else if (next < 0) {
            direction = 'backward';
            next = length - 1;
        }

        this.setState({ prev: current, current: next, direction });
    }

    slide(offset) {
        const { current } = this.state;
        this.moveTo(current + offset);
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

    handleClick(offset) {
        return function (e) {
            const strategies = { 'li': this.moveTo, 'button': this.slide };
            const nodeName = e.target.nodeName.toLowerCase();
            strategies[nodeName].call(this, offset);
        }.bind(this);
    }

    handleMouseUp() {
        if (this.props.allowTouch) {
            if (this.readyTouchSlide) {
                const offset = { 'left': 1, 'right': -1, }[this.touchDirection];
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
        this.pause();
    }

    render() {
        const { isFetch, imgData, haveDots, haveButtons } = this.props;
        const { direction } = this.state;
        const isEmpty = imgData.length === 0;
        const className = classnames({
            'slider-screen': true,
            [`slider-${direction}`]: direction !== 'stop',
        })
        console.log();
        return (
            <div>
                {isEmpty 
                    ? (isFetch ? <h2>Loading...</h2> : <h2>Empty</h2>)
                    : <div id="slider">
                        <div
                            className={className}
                            onMouseUp={this.handleMouseUp}
                            onMouseDown={this.handleMouseDown}
                            onMouseOver={this.handleMouseOver}
                            onMouseMove={this.handleMouseMove}
                            onMouseOut={this.handleMouseOut}
                        >
                            {this.renderImgs()}
                        </div>
                        {haveDots && this.renderDots()}
                        {haveButtons && this.renderButtons()}
                    </div>
                }
            </div>
        )
    }

    renderImgs() {
        const { imgData } = this.props;

        return (
            imgData.map((img, index) =>
                <img
                    key={index}
                    className={this.getItemClassName(index)}
                    src={img.src}
                    alt={img.alt}
                />
            )
        )
    }

    renderDots() {
        const { imgData } = this.props;
        const { current } = this.state;

        return (
            <DotList
                current={current}
                length={imgData.length}
                handleClick={this.handleClick}
            />
        )
    }

    renderButtons() {
        return (
            <div className="slider-toggle-button">
                <Button type={'button'} className={'to-left'} handleClick={this.handleClick(-1)} />
                <Button type={'button'} className={'to-right'} handleClick={this.handleClick(1)} />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
)(Slider);

function mapStateToProps(state) {
    return {
        isFetch: state.sliderReducer.isFetch,
        imgData: state.sliderReducer.imgData,
    }
}
