import { ADD_TODO, DELETE_TODO } from '../../actions/'

const initialState = {
    todoList:[]
}

const todoListReducer = function(state = initialState, action) {
    switch(action.type){
        case ADD_TODO:
            var todoList = Object.assign([], state.todoList);
            todoList.push(action.text);
            return {
                ...state,
                todoList
            };
        case DELETE_TODO:
            var todoList = Object.assign([], state.todoList);
            todoList.splice(action.index, 1);
            return {
                ...state,
                todoList,
            };
        default:
            return state;
    }
}

export default todoListReducer;