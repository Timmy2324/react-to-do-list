import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button/Button";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {InputWithButton} from "./components/Input/InputWithButton";

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
    updateTaskTitle: (toDoListID: string, taskID: string, title: string) => void
    updateToDoListTitle: (toDoListID: string, title: string) => void
}

export function ToDoList(props: ToDoListPropsTypes) {

    const removeTask = (taskID: string) => props.removeTask(props.toDoListID, taskID);
    const updateTask = (taskID: string, title: string) => props.updateTaskTitle(props.toDoListID, taskID, title)
    const changeStatus = (taskID: string, e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.toDoListID, taskID, e.currentTarget.checked);

    const getSpanClass = (isDone: boolean) => {
        return isDone ? 'is-done' : '';
    }

    const taskList = props.tasks.map((t: TaskType) => {
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={(e) => changeStatus(t.id, e)}
                />
                <EditableSpan callBack={(title) => updateTask(t.id, title)} className={getSpanClass(t.isDone)}
                              title={t.title}/>
                <Button name={'X'} callBack={() => removeTask(t.id)}/>
            </li>
        )
    })

    const addTask = (title: string) => {
        props.addTask(props.toDoListID, title)
    }

    const onClickFilterAllTasks = () => props.changeFilter(props.toDoListID, 'all');
    const onClickFilterActiveTasks = () => props.changeFilter(props.toDoListID, 'active');
    const onClickFilterCompletedTasks = () => props.changeFilter(props.toDoListID, 'completed');

    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? 'active-filter' : '';
    }

    const onClickRemoveToDoList = () => {
        props.removeToDoList(props.toDoListID)
    }

    const updateToDoListTitle = (title: string) => {
        props.updateToDoListTitle(props.toDoListID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={updateToDoListTitle}/>
                <Button name={'X'} callBack={onClickRemoveToDoList}/>
            </h3>
            <InputWithButton buttonName={'+'} callBack={addTask}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <Button className={getBtnClass('all')} name={'All'} callBack={onClickFilterAllTasks}/>
                <Button className={getBtnClass('active')} name={'Active'} callBack={onClickFilterActiveTasks}/>
                <Button className={getBtnClass('completed')} name={'Completed'} callBack={onClickFilterCompletedTasks}/>
            </div>
        </div>
    )
}