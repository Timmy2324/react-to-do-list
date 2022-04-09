import React from 'react';
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, ToDoListDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

let todolistId1: string;
let todolistId2: string;
let startState: Array<ToDoListDomainType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ];

})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' },
            { id: "3", title: "React", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' },
            { id: "2", title: "milk", status: TaskStatuses.Completed, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' },
            { id: "3", title: "tea",status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' }
        ]
    };

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListDomainType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
});
