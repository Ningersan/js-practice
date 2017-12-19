import React, { Component } from 'react';
import { ToDoList, Slider } from '../../components';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        {/* <ToDoList /> */}
        <Slider
          speed={2000}
          autoPlay={true}
          allowPause={true}
          allowTouch={true}
          haveDots={true}
          haveButton={true}
        />
      </div>
    );
  }
}

export default App;
