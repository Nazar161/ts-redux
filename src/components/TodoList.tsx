import React, {useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypeSelector";
import {fetchTodos} from "../store/action-creators/todo";
import {useActions} from "../hooks/useActions";

const TodoList:React.FC = () => {
    const {error, loading, todos, page, limit, changingLimit} = useTypedSelector(state => state.todo)
    const {fetchTodos, setTodoPage, setTodoLimit, changingTodoLimit} = useActions()
    const pages = [1, 2, 3, 4, 5]

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        changingTodoLimit(+e.target.value)
    }

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTodoLimit()
    }

    useEffect(() => {
        fetchTodos(page, limit)
    }, [page, limit])

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }
    return (
            <div>
                {todos.map(todo =>
                    <div key={todo.id}>{todo.id} - {todo.title}</div>
                )}
                <div style={{display: "flex"}}>
                    {pages.map(p =>
                        <div
                            onClick={() => setTodoPage(p)}
                            style={{border:p === page ? '2px solid green' : '1px solid gray', padding: 10}}
                        >
                            {p}
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
                        <input placeholder='limit' type='number' onChange={changeHandler} value={changingLimit}/>
                        <button>set limit</button>
                    </form>
                </div>
            </div>
    );
};

export default TodoList;