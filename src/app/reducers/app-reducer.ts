
enum AppActionType {
    SET_STATUS = 'APP/SET-STATUS',
    SET_ERROR = 'APP/SET-ERROR',
}

export type InitialAppStateType = {
    status: StatusType,
    error: string | null,
}

const initialState: InitialAppStateType = {
    status: 'idle',
    error: null,
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionType = SetAppStatusType | SetAppErrorType;

export const appReducer = (state: InitialAppStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case AppActionType.SET_STATUS:
        case AppActionType.SET_ERROR:
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