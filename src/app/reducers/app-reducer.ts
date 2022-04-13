import {Dispatch} from "redux";
import {authAPI} from "../../api/todolists-api";
import {setIsLoggedIn, SetIsLoggedInType} from "../../features/Auth/reducers/auth-reducer";

enum AppActionType {
    SET_STATUS = 'APP/SET-STATUS',
    SET_ERROR = 'APP/SET-ERROR',
    SET_IS_INITIALIZED = 'APP/SET-IS-INITIALIZED',
}

export type InitialAppStateType = {
    status: StatusType,
    error: string | null,
    isInitialized: boolean,
}

const initialState: InitialAppStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionType = SetAppStatusType | SetAppErrorType | SetAppInitialized;

export const appReducer = (state: InitialAppStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case AppActionType.SET_STATUS:
        case AppActionType.SET_ERROR:
        case AppActionType.SET_IS_INITIALIZED:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export const setAppStatus = (status: StatusType) => {
    return {
        type: AppActionType.SET_STATUS,
        payload: {
            status,
        },
    } as const
}

export type SetAppErrorType = ReturnType<typeof setAppError>
export const setAppError = (error: string | null) => {
    return {
        type: AppActionType.SET_ERROR,
        payload: {
            error,
        },
    } as const
}

export type SetAppInitialized = ReturnType<typeof setAppInitialized>
export const setAppInitialized = (isInitialized: boolean) => {
    return {
        type: AppActionType.SET_IS_INITIALIZED,
        payload: {
            isInitialized,
        },
    } as const
}

export const initializeApp = () => (dispatch: Dispatch<ActionType | SetIsLoggedInType>) => {
    authAPI.me()
        .then(({data}) => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedIn(true));
            } else {

            }
            dispatch(setAppInitialized(true));
        })
}