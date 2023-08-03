import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer";

const initialState = [];

//funcion inicializadora del useReducer(), evita que se borren los todos cuando recargamos la pagina
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init)
    //efecto secundario que se produce cuando diparo la action, (almacena los todos en el localStorage):
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleNewTodo = (todo) => {

        const action = {
            type: 'Add ToDo', 
            payload: todo
        }
        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: 'Delete ToDo',
            payload: id
        })
    }
    
    const handleToggleTodo = (id) => {
        dispatch({
            type: 'Toggle ToDo',
            payload: id
        })
    }

    return{
        todos, 
        handleDeleteTodo, 
        handleToggleTodo, 
        handleNewTodo,
        pendingTodosCount: 
            todos.filter(todo => !todo.done).length,
        todosCount: 
            todos.length,
    }
}