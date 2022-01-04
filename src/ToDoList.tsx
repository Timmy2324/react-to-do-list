import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type ToDoListPropsTypes = {
    toDoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (toDoListID: string, taskId: string) => void
    changeFilter: (toDoListID: string, filter: FilterValuesType) => void
    addTask: (toDoListID: string, title: string) => void
    changeTaskStatus: (toDoListID: string, id: string, isDone: boolean) => void
    removeToDoList: (toDoListID: string) => void
}

export function ToDoList(props: ToDoListPropsTypes) {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<boolean>(false);
    const taskList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(props.toDoListID, t.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.toDoListID, t.id, e.currentTarget.checked);
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const addTask = () => {
        const trimTitle = title.trim();
        if (trimTitle) {
            props.addTask(props.toDoListID, trimTitle);
        } else {
            setError(true);
        }
        setTitle('');
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }


    const onClickFilterAllTasks = () => props.changeFilter(props.toDoListID, 'all');
    const onClickFilterActiveTasks = () => props.changeFilter(props.toDoListID, 'active');
    const onClickFilterCompletedTasks = () => props.changeFilter(props.toDoListID, 'completed');

    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? 'active-filter' : '';
    }

    const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>;

    const onClickHandler = () => {
        props.removeToDoList(props.toDoListID)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={onClickHandler}>X</button></h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button
                    className={getBtnClass('all')}
                    onClick={onClickFilterAllTasks}
                >
                    All
                </button>
                <button
                    className={getBtnClass('active')}
                    onClick={onClickFilterActiveTasks}
                >
                    Active
                </button>
                <button
                    className={getBtnClass('completed')}
                    onClick={onClickFilterCompletedTasks}
                >
                    Completed
                </button>
            </div>
        </div>
    )
}