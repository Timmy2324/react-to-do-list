import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    toDoLists: todolistsReducer,
    tasks: tasksReducer,
});

const initialGlobalState = {
    toDoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            { id: v1(), title: "CSS", isDone: false },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React", isDone: false },
        ],
        ["todolistId2"]: [
            { id: v1(), title: "bread", isDone: false },
            { id: v1(), title: "milk", isDone: true },
            { id: v1(), title: "tea", isDone: false },
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (story: any = initialGlobalState) => {
    return  <Provider store={storyBookStore}>{story()}</Provider>
}