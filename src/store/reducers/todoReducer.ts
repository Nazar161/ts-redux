import {TodoAction, TodoActionTypes, TodoState} from "../../types/todo";

const initialState:TodoState = {
    todos: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    changingLimit: 10,
    totalCountTodos: 0,
    totalCountPages: 0
}

export const todoReducer = (state=initialState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionTypes.FETCH_TODOS:
            return {...state, loading: true}
        case TodoActionTypes.FETCH_TODOS_SUCCESS:
            const pages = Math.ceil(action.payload2 / state.limit)
            return {...state, loading: false, todos: action.payload, totalCountTodos: action.payload2, totalCountPages: pages}
        case TodoActionTypes.FETCH_TODOS_ERROR:
            return {...state, loading: false, error: action.payload}
        case TodoActionTypes.SET_TODO_PAGE:
            return {...state, page: action.payload}
        case TodoActionTypes.SET_TODO_LIMIT:
            return {...state, limit: state.changingLimit, totalCountPages: Math.ceil(state.totalCountTodos / state.changingLimit), page: 1}
        case TodoActionTypes.CHANGING_TODO_LIMIT:
            return {...state, changingLimit: action.payload}
        default:
            return state
    }
}