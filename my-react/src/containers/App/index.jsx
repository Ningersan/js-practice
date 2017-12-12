import React, { Component } from 'react';
import { ToDoList } from '../../components';
import { Slider } from '../../components';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Slider>
          <img src="../../static/img/coco-1.jpg" alt="coco" />
          <img src="../../static/img/coco-2.jpg" alt="coco" />
          <img src="../../static/img/coco-3.jpg" alt="coco" />
          <img src="../../static/img/coco-4.jpg" alt="coco" />
          <img src="../../static/img/coco-5.jpg" alt="coco" />
        </Slider>
      </div>
    );
  }
}

export default App;
