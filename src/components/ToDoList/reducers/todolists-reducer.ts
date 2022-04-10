import {TaskType, todolistsApi, ToDoListType} from "../../../api/todolists-api";
import {Dispatch} from "redux";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type ToDoListDomainType = ToDoListType & {
    filter: FilterValuesType,
}

type ActionType = RemoveTodolistACType
                | AddTodolistACType
                | ChangeTodolistTitleACType
                | ChangeTodolistFilterACType
                | SetToDoListsACType;

export const todolistsReducer = (state: Array<ToDoListDomainType> = [], action: ActionType): Array<ToDoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST':{
            return [{
                ...action.payload.toDoList, filter: 'all'},
                ...state,
            ];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(toDoList => toDoList.id === action.payload.id ? {...toDoList, title: action.payload.title} : toDoList);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(toDoList => toDoList.id === action.payload.id ? {...toDoList, filter: action.payload.filter} : toDoList);
        }
        case 'SET-TODOLIST': {
            return action.payload.toDoLists.map(toDoList => ({...toDoList, filter: "all"}) )
        }
        default:
            return state;
    }
}

// actions
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id,
        },
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (toDoList: ToDoListType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            toDoList,
        },
    } as const
}

export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title,
        },
    } as const
}

export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter,
        },
    } as const
}

export type SetToDoListsACType = ReturnType<typeof setToDOListsAC>
export const setToDOListsAC = (toDoLists: Array<ToDoListType>) => {
    return {
        type: 'SET-TODOLIST',
        payload: {
            toDoLists,
        },
    } as const
}

// thunks
export const fetchToDoLists = () => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.getToDoLists()
        .then(({data}) => {
            dispatch(setToDOListsAC(data));
        })
}

export const deleteToDoList = (toDoListID: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.deleteToDoList(toDoListID)
        .then((response) => {
            dispatch(removeTodolistAC(toDoListID));
        });
}

export const createToDoList = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.createToDoList(title)
        .then(({data}) => {
            dispatch(addTodolistAC(data.data.item));
        });
}

export const changeToDoListTitle = (toDoListID: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.updateToDoList(toDoListID, title)
        .then((response) => {
            dispatch(changeTodolistTitleAC(toDoListID, title));
        });
}