import {
    addTaskAC,
    removeTaskAC, setTasksAC,
    tasksReducer, updateTaskAC
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodolistAC, removeTodolistAC, setToDOListsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' },
            { id: "3", title: "React", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' },
            { id: "2", title: "milk", status: TaskStatuses.Completed, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' },
            { id: "3", title: "tea", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "2");

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS",status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' },
            { id: "3", title: "React", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId1' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' },
            { id: "3", title: "tea", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({ id: "1", title: "juce", status: TaskStatuses.New, addedDate: '', order: 0, startDate: '', deadline: '', description: '', priority: TaskPriorities.Middle, todoListId: 'todolistId2' });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", {status: TaskStatuses.New});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "3", {title: 'juce'});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][2].title).toBe('juce');
    expect(endState["todolistId1"][2].title).toBe('React');
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({id: "new todolist", title: "What to learn", addedDate: '', order: 0});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set ToDoLists', () => {
    const action = setToDOListsAC([
        {id: 'todolistId1', title: "What to learn", addedDate: '', order: 0},
        {id: 'todolistId2', title: "What to buy", addedDate: '', order: 0}
    ]);

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['todolistId1']).toStrictEqual([]);
    expect(endState['todolistId2']).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {
    const action = setTasksAC('todolistId1', startState['todolistId1']);

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': [],

    }, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
})