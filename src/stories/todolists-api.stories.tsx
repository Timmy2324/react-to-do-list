import React, {useState} from 'react';
import {todolistsApi, UpdateTaskType} from "../api/todolists-api";

export default {
    title: 'API',
}

export const GetToDoLists = () => {
    const [state, setState] = useState<any>(null);

    const onClickHandler = () => {
        todolistsApi.getToDoLists()
            .then(({data}) => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <button onClick={onClickHandler}>GetToDoLists</button>
            </div>
        </div>
    );
}

export const CreateToDoLists = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState('');

    const onClickHandler = () => {
        todolistsApi.createToDoList(title)
            .then(({data}) => {
                console.log(data)
                setState(data.data.item);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'Введите заголовок'} type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={onClickHandler}>CreateToDoLists</button>
            </div>
        </div>
    );
}

export const DeleteToDoLists = () => {
    const [state, setState] = useState<any>(null);
    const [toDoListID, setToDoListID] = useState('');

    const onClickHandler = () => {
        todolistsApi.deleteToDoList(toDoListID)
            .then(({data}) => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'Введите id todolist`a'} type="text" value={toDoListID} onChange={(e) => setToDoListID(e.currentTarget.value)}/>
                <button onClick={onClickHandler}>DeleteToDoLists</button>
            </div>
        </div>
    );
}

export const UpdateToDoLists = () => {
    const [state, setState] = useState<any>(null);
    const [toDoListID, setToDoListID] = useState('');
    const [title, setTitle] = useState('');

    const onClickHandler = () => {
        todolistsApi.updateToDoList(toDoListID, title)
            .then(({data}) => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'Введите id todolist`a'} type="text" value={toDoListID} onChange={(e) => setToDoListID(e.currentTarget.value)}/>
                <input placeholder={'Введите заголовок'} type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={onClickHandler}>UpdateToDoLists</button>
            </div>
        </div>
    );
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null);
    const [toDoListID, setToDoListID] = useState('');

    const onClickHandler = () => {
        todolistsApi.getTasks(toDoListID)
            .then(({data}) => {
                setState(data.items);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'Введите id todolist`a'} type="text" value={toDoListID} onChange={(e) => setToDoListID(e.currentTarget.value)}/>
                <button onClick={onClickHandler}>GetTask</button>
            </div>
        </div>
    );
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [toDoListID, setToDoListID] = useState('');
    const [title, setTitle] = useState('');

    const onClickHandler = () => {
        todolistsApi.createTask(toDoListID, title)
            .then(({data}) => {
                setState(data.data.item);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'Введите id todolist`a'} type="text" value={toDoListID} onChange={(e) => setToDoListID(e.currentTarget.value)}/>
                <input placeholder={'Введите заголовок'} type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={onClickHandler}>CreateTask</button>
            </div>
        </div>
    );
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [toDoListID, setToDoListID] = useState('');
    const [taskID, setTaskID] = useState('');

    const onClickHandler = () => {
        todolistsApi.deleteTask(toDoListID, taskID)
            .then(({data}) => {
                setState(data.data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'Введите id todolist`a'} type="text" value={toDoListID} onChange={(e) => setToDoListID(e.currentTarget.value)}/>
                <input placeholder={'Введите id task`и'} type="text" value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)}/>
                <button onClick={onClickHandler}>DeleteTask</button>
            </div>
        </div>
    );
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [toDoListID, setToDoListID] = useState('');
    const [taskID, setTaskID] = useState('');
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [startDate, setStartDate] = useState('');
    const [status, setStatus] = useState('');

    const onClickHandler = () => {
        const update:UpdateTaskType = {
            title: 'title',
            deadline: String(new Date().getDate()),
            description: 'description',
            priority: 3,
            startDate: String(new Date().getDate()),
            status: 3,
        };
        todolistsApi.updateTask(toDoListID, taskID, update)
            .then(({data}) => {
                setState(data.data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <div>
                    <input placeholder={'Введите id todolist`a'} type="text" value={toDoListID} onChange={(e) => setToDoListID(e.currentTarget.value)}/>
                </div>
                <div>
                    <input placeholder={'Введите id task`и'} type="text" value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)}/>
                </div>
                <div>
                    <input placeholder={'Введите title'} type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                </div>
                <div>
                    <input placeholder={'Введите deadline'} type="text" value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>
                </div>
                <div>
                    <input placeholder={'Введите description'} type="text" value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
                </div>
                <div>
                    <input placeholder={'Введите priority'} type="text" value={priority} onChange={(e) => setPriority(e.currentTarget.value)}/>
                </div>
                <div>
                    <input placeholder={'Введите startDate'} type="text" value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
                </div>
                <div>
                    <input placeholder={'Введите status'} type="text" value={status} onChange={(e) => setStatus(e.currentTarget.value)}/>
                </div>
                <button onClick={onClickHandler}>UpdateTask</button>
            </div>
        </div>
    );
}

