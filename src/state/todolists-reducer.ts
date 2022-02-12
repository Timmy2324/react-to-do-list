import {FilterValuesType, ToDoListsType} from '../App';
import {v1} from 'uuid';

// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST',
//     id: string
// }
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST',
//     title: string
//     todolistId: string
// }
// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE',
//     id: string
//     title: string
// }
// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER',
//     id: string
//     filter: FilterValuesType
// }
//
// type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;



export const todolistsReducer = (state: Array<ToDoListsType>, action: GeneralTypeForAC) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id);
        case 'ADD-TODOLIST':
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: "all"}];
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter} : m);
        }
        default:
            return state;
    }
}

type GeneralTypeForAC = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id},
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todolistId: v1()},
    } as const
}

export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title},
    } as const
}

export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter},
    } as const
}

// export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//     return { type: 'REMOVE-TODOLIST', id: todolistId}
// }
// export const AddTodolistAC = (title: string): AddTodolistActionType => {
//     return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
// }
// export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
//     return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
// }
// export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
//     return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
// }
