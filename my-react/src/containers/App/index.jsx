import React, { Component } from 'react';
import { ToDoList, Slider } from '../../components';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const imgData = [
    //   {
    //     src: '../../static/img/coco-1.jpg',
    //     alt: 'coco',
    //   },
    //   {
    //     src: '../../static/img/coco-2.jpg',
    //     alt: 'coco',
    //   },
    //   {
    //     src: '../../static/img/coco-3.jpg',
    //     alt: 'coco',
    //   },
    //   {
    //     src: '../../static/img/coco-4.jpg',
    //     alt: 'coco',
    //   },
    //   {
    //     src: '../../static/img/coco-5.jpg',
    //     alt: 'coco',
    //   },
    // ];

    return (
      <div className="container">
        {/* <ToDoList /> */}
        <Slider
          speed={2000}
          autoPlay={true}
          allowPause={true}
          allowTouch={true}
          haveDots={true}
        />
      </div>
    );
  }
}

export default App;
