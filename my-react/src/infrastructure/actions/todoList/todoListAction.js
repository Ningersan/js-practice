export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const addTodo = function(text){
    return{
        type: ADD_TODO,
        text
    }
}

export const delTodo = function(index) {
    return {
        type: DELETE_TODO,
        index
    }
}
