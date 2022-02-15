import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {InputWithButton} from "./components/Input/InputWithButton";
import {DeleteOutline} from "@mui/icons-material";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type ToDoListPropsTypes = {
    toDoListID: string
    title: string
    filter: FilterValuesType
    changeFilter: (toDoListID: string, filter: FilterValuesType) => void
    removeToDoList: (toDoListID: string) => void
    updateToDoListTitle: (toDoListID: string, title: string) => void
}

export function ToDoList(props: ToDoListPropsTypes) {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.toDoListID]);

    const addTask = (title: string) => dispatch(addTaskAC(props.toDoListID, title));
    const removeTask = (taskID: string) => dispatch(removeTaskAC(props.toDoListID, taskID));
    const updateTask = (taskID: string, title: string) => dispatch(changeTaskTitleAC(props.toDoListID, taskID, title));
    const changeStatus = (taskID: string, e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(props.toDoListID, taskID, e.currentTarget.checked));


    const onClickFilterAllTasks = () => props.changeFilter(props.toDoListID, 'all');
    const onClickFilterActiveTasks = () => props.changeFilter(props.toDoListID, 'active');
    const onClickFilterCompletedTasks = () => props.changeFilter(props.toDoListID, 'completed');

    const onClickRemoveToDoList = () => props.removeToDoList(props.toDoListID);
    const updateToDoListTitle = (title: string) => props.updateToDoListTitle(props.toDoListID, title);

    const getSpanClass = (isDone: boolean) => {
        return isDone ? 'is-done' : '';
    }
    let tasksForTodolist = tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    const taskList = tasksForTodolist.map((t: TaskType) => {
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