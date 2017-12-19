import React, { Component } from 'react';
import List from './component/todoList';
import TypeNew from './component/typeNew';
import { connect } from 'react-redux';
import { addTodo, delTodo } from '../../infrastructure/actions/';

class ToDoList extends Component {
    constructor() {
        super();
    }

    render() {
        return (<div>
            <TypeNew handleAddTodo={this.props.addTodo} />
            <List handleDelTodo={this.props.delTodo} todolist={this.props.todolist} />
        </div>)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToDoList)

function mapStateToProps(state) {
    return {
        todolist: state.todoListReducer.todoList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: (text) => {
            dispatch(addTodo(text))
        },
        delTodo: (index) => {
            dispatch(delTodo(index))
        },
    }
}
