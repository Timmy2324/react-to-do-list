import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {InputWithButton} from "./components/Input/InputWithButton";
import {DeleteOutline} from "@mui/icons-material";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";

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
            <div key={t.id}>
                <Checkbox
                    checked={t.isDone}
                    onChange={(e) => changeStatus(t.id, e)}
                />
                <EditableSpan callBack={(title) => updateTask(t.id, title)} className={getSpanClass(t.isDone)}
                              title={t.title}/>
                <IconButton onClick={() => removeTask(t.id)}><DeleteOutline /></IconButton>
            </div>
        )
    })

    const addTask = (title: string) => {
        props.addTask(props.toDoListID, title)
    }

    const onClickFilterAllTasks = () => props.changeFilter(props.toDoListID, 'all');
    const onClickFilterActiveTasks = () => props.changeFilter(props.toDoListID, 'active');
    const onClickFilterCompletedTasks = () => props.changeFilter(props.toDoListID, 'completed');

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
                <IconButton onClick={onClickRemoveToDoList}><DeleteOutline /></IconButton>
            </h3>
            <InputWithButton callBack={addTask}/>
            <div>
                {taskList}
            </div>
            <ButtonGroup>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onClickFilterAllTasks}
                >
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onClickFilterActiveTasks}
                >
                    Active
                </Button>
                <Button
                    color={'success'}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onClickFilterCompletedTasks}
                >
                    Completed
                </Button>
            </ButtonGroup>
        </div>
    )
}