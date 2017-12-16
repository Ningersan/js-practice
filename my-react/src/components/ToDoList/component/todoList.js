import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
    static defaultProps = {
        todolist:[]
    }

    static propTypes = {
        todolist: PropTypes.array.isRequired,
        handleDelTodo: PropTypes.func.isRequired,
    }

    constructor(){
        super();
        this._handleDel = this._handleDel.bind(this);
    }

    _handleDel(e){
        let delindex = e.target.getAttribute("data-key");
        this.props.handleDelTodo(delindex);
    }

    render(){
        return(
            <ul id="todo-list">
            {
                this.props.todolist.map((item, i) => {
                    return (
                        <li key={i}>
                            <span className="toggle"></span>
                            <label>{item}</label>
                            <button className="destroy" onClick = {this._handleDel} data-key = {i} >delete</button>
                        </li>
                        )
                })
            }
        </ul>
        )
    }
}

export default List;