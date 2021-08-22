import {TodoAction, TodoActionTypes} from "../../types/todo";
import axios from "axios";
import {Dispatch} from "redux";


export const fetchTodos = (page=1, limit=10) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try{
            dispatch({type: TodoActionTypes.FETCH_TODOS})
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos', {
                params: {_page: page, _limit: limit}
            })
            const totalCount = res.headers['x-total-count']
            dispatch({type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: res.data, payload2: totalCount})
        }catch (e) {
            dispatch({type: TodoActionTypes.FETCH_TODOS_ERROR, payload: 'Ошибка'})
        }
    }
}

export function setTodoPage(page: number):TodoAction {
    return {type: TodoActionTypes.SET_TODO_PAGE, payload: page}
}

export function setTodoLimit():TodoAction {
    return {type: TodoActionTypes.SET_TODO_LIMIT}
}

export function changingTodoLimit(lim: number):TodoAction {
    return {type: TodoActionTypes.CHANGING_TODO_LIMIT, payload: lim}
}