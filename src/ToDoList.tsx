import React from "react";
import {FilterValuesType, TaskType} from "./App";

type ToDoListPropsTypes = {
    title: string,
    tasks: Array<TaskType>,
    filter: FilterValuesType,
    removeTask: (taskId: number) => void,
    changeFilter: (filter: FilterValuesType) => void,
}

export function ToDoList(props: ToDoListPropsTypes) {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={ () => { props.removeTask(t.id) }}>X</button>
                            </li>
                    ))
                }
            </ul>
            <div>
                <button
                    onClick={() => props.changeFilter('all')}
                >All</button>
                <button
                    onClick={() => props.changeFilter('active')}
                >Active</button>
                <button
                    onClick={() => props.changeFilter('completed')}
                >Completed</button>
            </div>
        </div>
    )
}