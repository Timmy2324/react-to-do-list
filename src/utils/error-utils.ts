import {setAppError, SetAppErrorType, setAppStatus, SetAppStatusType} from "../app/reducers/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {
    changeTodolistEntityStatusAC,
    ChangeTodolistEntityStatusACType
} from "../components/ToDoList/reducers/todolists-reducer";

type ErrorDispatchType = Dispatch<SetAppStatusType | SetAppErrorType | ChangeTodolistEntityStatusACType>;

export const handleServerAppError = <T>(toDoListID: string, data: ResponseType<T>, dispatch: ErrorDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]));
    } else {
        dispatch(setAppError('some error occurred'));
    }
    dispatch(setAppStatus('failed'));
    dispatch(changeTodolistEntityStatusAC(toDoListID,'failed'));
}

export const handleServerNetworkError = (toDoListID: string, error: AxiosError, dispatch: ErrorDispatchType) => {
    dispatch(setAppError(error.message ? error.message : 'Some error'));
    dispatch(setAppStatus('failed'));
    dispatch(changeTodolistEntityStatusAC(toDoListID,'failed'));
}