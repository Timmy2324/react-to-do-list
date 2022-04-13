import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../components/ToDoList/reducers/tasks-reducer";
import {todolistsReducer} from "../components/ToDoList/reducers/todolists-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./reducers/app-reducer";
import {authReducer} from "../features/Auth/reducers/auth-reducer";

const rootReducer = combineReducers({
    toDoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

