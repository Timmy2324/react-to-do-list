import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

// export type RemoveTaskActionType = {
//     type: 'REMOVE-TASK'
//     taskId: string
//     todolistId: string
// }
// export type AddTaskActionType = {
//     type: 'ADD-TASK'
//     title: string
//     todolistId: string
// }
// export type ChangeTaskStatusType = {
//     type: 'CHANGE-TASK-STATUS'
//     taskId: string
//     isDone: boolean
//     todolistId: string
// }
// export type ChangeTaskTitleType = {
//     type: 'CHANGE-TASK-TITLE'
//     taskId: string
//     title: string
//     todolistId: string
// }
//
// type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodolistACType | RemoveTodolistACType;

export const tasksReducer = (state: TasksStateType, action: GenerationType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState;
        }
        default:
            return state;
    }
}

type GenerationType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType;

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId},
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId},
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todolistId, taskId, isDone},
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todolistId, taskId, title}
    } as const
}