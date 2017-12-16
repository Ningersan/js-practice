import React, {Component } from 'react'
import PropTypes from 'prop-types';

class TypeNew extends Component {
    static defaultProps = {
        todolist:[]
    }

    static propTypes = {
        handleAddTodo: PropTypes.func
    }

    constructor() {
        super();
        this._handleAdd = this._handleAdd.bind(this);
    }
    _handleAdd(e){
        e.preventDefault();
        let newthing = this.refs.inputnew.value.trim();
        if ( newthing != '' ){
            this.props.handleAddTodo(newthing);
        }
        this.refs.inputnew.value = '';
    }
    render() {
        return (
            <form onSubmit={this._handleAdd}>
                <input
                    ref="inputnew"
                    type="text"
                    placeholder="type a newthing todo"
                    id="new-todo"/>
            </form>
        )
    }
}

export default TypeNew;