import React, { Component } from 'react';
import Form from './Form';
import List from './List';

// import './index.css';

class ToDoList extends Component {
    constructor() {
        super();
        this._handleAdd = this._handleAdd.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleDel = this._handleDel.bind(this);
        this.state = {
            todolist: []
        }
    }
    _handleChange(rows) {
        this.setState({ todolist: rows });
    }
    _handleAdd(e) {
        e.preventDefault();
        let newthing = this.inputElement.value.trim();
        let rows = Object.assign([], this.state.todolist);
        if (newthing != '') {
            rows.push(newthing);
            this._handleChange(rows);
        }
        this.inputElement.value = '';
    }
    _handleDel(e) {
        let delindex = e.target.getAttribute("data-key");
        let rows = Object.assign([], this.state.todolist);
        rows.splice(delindex, 1);
        this._handleChange(rows);
    }
    render() {
        return (<div>
            <Form
                handleClick={this._handleAdd}
            >
                <input ref={el => this.inputElement = el} type="text" placeholder="type a newthing todo" id="new-todo" />
            </Form>
            <List
                todos={this.state.todolist}
                handleDel={this._handleDel}
            />
        </div>)
    }
}

export default ToDoList;


