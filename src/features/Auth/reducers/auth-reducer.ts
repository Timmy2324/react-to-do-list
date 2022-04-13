import {Dispatch} from "redux";
import {setAppError, SetAppErrorType, setAppStatus, SetAppStatusType} from "../../../app/reducers/app-reducer";
import {authAPI, LoginParamsType} from "../../../api/todolists-api";

enum AuthActionType {
    SET_IS_LOGGED_IN = 'Login/SET-IS-LOGGED-IN',
}

export type InitialStateType = {
    isLoggedIn: boolean
}

type ActionType = SetIsLoggedInType;

type ThunkDispatch = Dispatch<ActionType | SetAppStatusType | SetAppErrorType>;

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case AuthActionType.SET_IS_LOGGED_IN: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

// actions
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return {
        type: AuthActionType.SET_IS_LOGGED_IN,
        payload: {
            isLoggedIn,
        },
    } as const
}

// thunks
export const login = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'));
    authAPI.login(data)
        .then(({data}) => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedIn(true));
                dispatch(setAppStatus('succeeded'));
            } else {
                dispatch(setAppError(data.messages[0]));
                dispatch(setAppStatus('failed'));
            }
        })
        .catch((error) => {
            dispatch(setAppError(error.message ? error.message : 'Some error'));
            dispatch(setAppStatus('failed'));
        })
}

export const logOut = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'));
    authAPI.logOut()
        .then(({data}) => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedIn(false));
                dispatch(setAppStatus('succeeded'));
            } else {
                dispatch(setAppError(data.messages[0]));
                dispatch(setAppStatus('failed'));
            }
        })
        .catch((error) => {
            dispatch(setAppError(error.message ? error.message : 'Some error'));
            dispatch(setAppStatus('failed'));
        })
}