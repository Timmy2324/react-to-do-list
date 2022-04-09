import {v1} from 'uuid';
import {ToDoListType} from "../api/todolists-api";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type ToDoListDomainType = ToDoListType & {
    filter: FilterValuesType,
}

export const todolistsReducer = (state: Array<ToDoListDomainType> = [], action: GeneralTypeForAC): Array<ToDoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id);
        case 'ADD-TODOLIST':{
            const newTodolist:ToDoListDomainType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all', order: 0, addedDate: ''}
            return [newTodolist, ...state];
        }
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