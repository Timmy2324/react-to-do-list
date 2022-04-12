import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../app/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../components/ToDoList/reducers/todolists-reducer";
import {tasksReducer} from "../components/ToDoList/reducers/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../app/reducers/app-reducer";

const rootReducer = combineReducers({
    toDoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
});

const initialGlobalState: AppRootStateType = {
    toDoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'loading'},
    ],
    tasks: {
        ["todolistId1"]: [
            { id: v1(), title: "CSS", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' },
            { id: v1(), title: "JS", status: TaskStatuses.Completed, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1'  },
            { id: v1(), title: "React", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1'  },
        ],
        ["todolistId2"]: [
            { id: v1(), title: "bread", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2'  },
            { id: v1(), title: "milk", status: TaskStatuses.Completed, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2'  },
            { id: v1(), title: "tea", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2'  },
        ]
    },
    app: {
        status: "idle",
        error: null,
    },
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (story: any = initialGlobalState) => {
    return  <Provider store={storyBookStore}>{story()}</Provider>
}