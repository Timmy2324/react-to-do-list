import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "642ef21e-b6f0-4355-8bfb-f882a3b3360e",
    },

});

export type ToDoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export type TaskType = {
    description: string,
    title: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}

type ResponseType<T = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: T,
}

type GetTasksResponse = {
    items: TaskType[],
    error: string | null,
    totalCount: number,
}

export type UpdateTaskType = {
    title: string,
    description: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
}

export const todolistsApi = {
    getToDoLists() {
        return instance.get<Array<ToDoListType>>(`todo-lists/`);
    },
    createToDoList(title: string) {
        return instance.post<ResponseType<{item: ToDoListType}>>(`todo-lists/`, {title});
    },
    deleteToDoList(toDoListID: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListID}`);
    },
    updateToDoList(toDoListID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${toDoListID}`, {title});
    },
    getTasks(toDoListID: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${toDoListID}/tasks`);
    },
    deleteTask(toDoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListID}/tasks/${taskID}`);
    },
    createTask(toDoListID: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${toDoListID}/tasks`, {title});
    },
    updateTask(toDoListID: string, taskID: string, taskBody: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${toDoListID}/tasks${taskID}`, {...taskBody});
    }
}