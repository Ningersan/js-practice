import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DotList from './DotList';
import Button from './Button';
import './index.css';

class Slider extends Component {
    static defaultProps = {
        url: 'api/assistance/home/banner',
        speed: 3000,
        haveDots: true,
        haveArrows: true,
        allowAutoPlay: true,
        allowPause: true,
        allowTouch: true,
    }

    static propTypes = {
        url: PropTypes.string.isRequired,
        imgData: PropTypes.arrayOf(PropTypes.string.isRequired),
        speed: PropTypes.number.isRequired,
        haveDots: PropTypes.bool.isRequired,
        haveArrows: PropTypes.bool.isRequired,
        allowAutoPlay: PropTypes.bool.isRequired,
        allowPause: PropTypes.bool.isRequired,
        allowTouch: PropTypes.bool.isRequired,
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

    componentDidMount() {
        const { url, fetchData, allowAutoPlay } = this.props

        if (allowAutoPlay) {
            this.autoPlay();
        }
    }

    componentWillUnmount() {
        if (this.props.allowAutoPlay) {
            this.pause();
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
        if (this.props.allowPause && this.props.allowAutoPlay) {
            this.autoPlay();
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
        this.timer = setInterval(() => this.slide(1), this.props.speed);
    }

    pause() {
        clearInterval(this.timer);
    }

    renderLoading() {
        return (
            <div className="slider-loading">
                <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1" />
                    <div className="sk-child sk-bounce2" />
                    <div className="sk-child sk-bounce3" />
                </div>
            </div>
        )
    }

    renderImgs() {
        const { imgData } = this.props;

        return (
            imgData.map((img, index) => (
                <img
                    key={index}
                    className={this.getItemClassName(index)}
                    src={img.src || img}
                    alt={img.alt}
                />
            ))
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
            <div className="slider-arrows-wrap">
                <Button type={'button'} className={'slider-to-left'} handleClick={this.handleClick(-1)} >&lt;</Button>
                <Button type={'button'} className={'slider-to-right'} handleClick={this.handleClick(1)} >&gt;</Button>
            </div>
        )
    }

    render() {
        const { isFetching, imgData, haveDots, haveArrows } = this.props;
        const { direction } = this.state;
        const isEmpty = imgData.length === 0;
        const className = classnames({
            'slider-screen': true,
            [`slider-${direction}`]: direction !== 'stop',
        })

        return (
            <div className="slider-wrap">
                {isEmpty
                    ? (isFetching ? this.renderLoading() : <h2>{this.props.message}</h2>)
                    : <div className="slider">
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
                        {haveArrows && this.renderButtons()}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.sliderReducer.isFetching,
    message: state.sliderReducer.message,
    imgData: state.sliderReducer.imgData,
})

export default connect(
    mapStateToProps,
)(Slider);
