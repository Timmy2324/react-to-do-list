import {addTodolistAC, TasksStateType, ToDoListDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startToDoListsState: Array<ToDoListDomainType> = [];

    const action = addTodolistAC({id: "new todolist", title: "What to learn", addedDate: '', order: 0},);

    const endTasksState = tasksReducer(startTasksState, action)
    const endToDoListsState = todolistsReducer(startToDoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromToDoLists = endToDoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.toDoList.id);
    expect(idFromToDoLists).toBe(action.payload.toDoList.id);
});