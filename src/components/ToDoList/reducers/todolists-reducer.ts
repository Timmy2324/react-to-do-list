import {TaskType, todolistsApi, ToDoListType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {
    setAppError,
    SetAppErrorType,
    setAppStatus,
    SetAppStatusType,
    StatusType,
} from "../../../app/reducers/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type ToDoListDomainType = ToDoListType & {
    filter: FilterValuesType,
    entityStatus: StatusType,
}

type ActionType = RemoveTodolistACType
                | AddTodolistACType
                | ChangeTodolistTitleACType
                | ChangeTodolistFilterACType
                | SetToDoListsACType
                | ChangeTodolistEntityStatusACType;

type ThunkDispatch = Dispatch<ActionType | SetAppStatusType | SetAppErrorType>;

export const todolistsReducer = (state: Array<ToDoListDomainType> = [], action: ActionType): Array<ToDoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST':{
            return [{...action.payload.toDoList, filter: 'all', entityStatus: 'idle'}, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(toDoList => toDoList.id === action.payload.id ? {...toDoList, title: action.payload.title} : toDoList);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(toDoList => toDoList.id === action.payload.id ? {...toDoList, filter: action.payload.filter} : toDoList);
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(toDoList => toDoList.id === action.payload.id ? {...toDoList, entityStatus: action.payload.status} : toDoList);
        }
        case 'SET-TODOLIST': {
            return action.payload.toDoLists.map(toDoList => ({...toDoList, filter: "all", entityStatus: 'idle'}));
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

export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (id: string, status: StatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        payload: {
            id,
            status,
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
export const fetchToDoLists = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'));
    todolistsApi.getToDoLists()
        .then(({data}) => {
            dispatch(setToDOListsAC(data));
            dispatch(setAppStatus('succeeded'));
        })
        .catch((error) => {
            dispatch(setAppError(error.message ? error.message : 'Some error'));
            dispatch(setAppStatus('failed'));
        });
}

export const deleteToDoList = (toDoListID: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'));
    dispatch(changeTodolistEntityStatusAC(toDoListID,'loading'));
    todolistsApi.deleteToDoList(toDoListID)
        .then(({data}) => {
            console.log(data)
            if (data.resultCode === 0) {
                dispatch(removeTodolistAC(toDoListID));
                dispatch(setAppStatus('succeeded'));
                dispatch(changeTodolistEntityStatusAC(toDoListID,'succeeded'));
            } else {
                handleServerAppError(toDoListID, data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(toDoListID, error, dispatch);
        });
}

export const createToDoList = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'));
    todolistsApi.createToDoList(title)
        .then(({data}) => {
            if (data.resultCode === 0) {
                dispatch(addTodolistAC(data.data.item));
                dispatch(setAppStatus('succeeded'));
            } else {
                if (data.messages.length) {
                    dispatch(setAppError(data.messages[0]));
                } else {
                    dispatch(setAppError('some error occurred'));
                }
                dispatch(setAppStatus('failed'));
            }
        })
        .catch((error) => {
            dispatch(setAppError(error.message ? error.message : 'Some error'));
            dispatch(setAppStatus('failed'));
        });
}

export const changeToDoListTitle = (toDoListID: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'));
    dispatch(changeTodolistEntityStatusAC(toDoListID,'loading'));
    todolistsApi.updateToDoList(toDoListID, title)
        .then(({data}) => {
            if (data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(toDoListID, title));
                dispatch(setAppStatus('succeeded'));
                dispatch(changeTodolistEntityStatusAC(toDoListID,'succeeded'));
            } else {
                handleServerAppError(toDoListID, data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(toDoListID, error, dispatch);
        });
}