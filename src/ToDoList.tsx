import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type ToDoListPropsTypes = {
    title: string,
    tasks: Array<TaskType>,
    filter: FilterValuesType,
    removeTask: (taskId: string) => void,
    changeFilter: (filter: FilterValuesType) => void,
    addTask: (title: string) => void
}

export function ToDoList(props: ToDoListPropsTypes) {

    let [title, setTitle] = useState('');

    const addTask = () => {
        props.addTask(title);
        setTitle('');
    }

    const onClickChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter ') {
            addTask()
        }
    }


    const onClickFilterAllTasks = () => props.changeFilter('all');
    const onClickFilterActiveTasks = () => props.changeFilter('active');
    const onClickFilterCompletedTasks = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onClickChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickRemoveTask = () => props.removeTask(t.id);
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickRemoveTask}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button
                    onClick={onClickFilterAllTasks}
                >
                    All
                </button>
                <button
                    onClick={onClickFilterActiveTasks}
                >
                    Active
                </button>
                <button
                    onClick={onClickFilterCompletedTasks}
                >
                    Completed
                </button>
            </div>
        </div>
    )
}