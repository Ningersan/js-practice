import React, { Component, PropTypes } from 'react';
// import PropTypes from 'props-types';

function List(props) {
    const { todos, handleDel } = props;

    return (
        <ul id="todo-list">
            {
                todos.map((item, i) => {
                    return (
                        <li key={i}>
                            <span className="toggle"></span>
                            <label>{item}</label>
                            <button className="destroy" onClick={handleDel} data-key={i} >delete</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

List.PropTypes = {
    todos: PropTypes.array.isRequired,
    handleDel: PropTypes.func.isRequired,
}

export default List
