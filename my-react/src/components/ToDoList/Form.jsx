import React, { Component, PropTypes } from 'react'

function Form(props) {
    return (
        <form onSubmit={props.handleClick}>
            {React.Children.map(props.children, child => child)}
        </form>
    )
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default Form
