import React, { Component, PropTypes } from 'react'

function Form(props) {
    return (
        <form onSubmit={props.handleClick}>
            {props.children}
        </form>
    )
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default Form
