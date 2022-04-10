import {AddTodolistACType, RemoveTodolistACType, SetToDoListsACType, TasksStateType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";

export type UpdateTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}

type ActionType = RemoveTaskACType
                | AddTaskACType
                | UpdateTaskACType
                | AddTodolistACType
                | RemoveTodolistACType
                | SetToDoListsACType
                | SetTasksACType;

export const tasksReducer = (state: TasksStateType = {}, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId),
            };
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
            };
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, ...action.payload.model} : task),
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.toDoList.id]: [],
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState;
        }
        case 'SET-TODOLIST': {
            const copyState = {...state}
            action.payload.toDoLists.forEach((toDoList) => {
                copyState[toDoList.id] = [];
            })
            return copyState;
        }
        case 'SET-TASKS': {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks,
            };
        }
        default:
            return state;
    }
}

// actions
type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId,
        },
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task,
        },
    } as const
}

type UpdateTaskACType = ReturnType<typeof updateTaskAC>;
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            taskId,
            model,
        },
    } as const
}

type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks,
        }
    } as const
}

// thunks
export const fetchTasks = (toDoListID: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.getTasks(toDoListID)
        .then(({data}) => {
            dispatch(setTasksAC(toDoListID, data.items));
        });
}

export const deleteTask = (toDoListID: string, taskID: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.deleteTask(toDoListID, taskID)
        .then((response) => {
            dispatch(removeTaskAC(toDoListID, taskID))
        })
}

export const createTask = (toDoListID: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.createTask(toDoListID, title)
        .then(({data}) => {
            dispatch(addTaskAC(data.data.item));
        });
}

export const updateTask = (toDoListID: string, taskID: string, modelTask: UpdateTaskModelType) =>
    (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[toDoListID].find(task => task.id === taskID);
    if (!task) {
        console.warn('Task is not found');
        return;
    }

    const updatedTask: UpdateTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...modelTask,
    }
    todolistsApi.updateTask(toDoListID, taskID, updatedTask)
        .then((response) => {
            dispatch(updateTaskAC(toDoListID, taskID, modelTask));
        });
}