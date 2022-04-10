import React, {ChangeEvent, memo, useCallback, useEffect} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {InputWithButton} from "../Input/InputWithButton";
import {DeleteOutline} from "@mui/icons-material";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    createTask, deleteTask,
    fetchTasks, updateTask,
} from "./reducers/tasks-reducer";
import {Task} from "./Task/Task";
import {FilterValuesType} from "./reducers/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";

type ToDoListPropsTypes = {
    toDoListID: string
    title: string
    filter: FilterValuesType
    changeFilter: (toDoListID: string, filter: FilterValuesType) => void
    removeToDoList: (toDoListID: string) => void
    updateToDoListTitle: (toDoListID: string, title: string) => void
}

export const ToDoList = memo((props: ToDoListPropsTypes) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.toDoListID]);

    useEffect(() => {
        dispatch(fetchTasks(props.toDoListID));
    }, []);

    const addTask = useCallback((title: string) => {
        dispatch(createTask(props.toDoListID, title));
    }, [dispatch, props.toDoListID]);

    const removeTask = useCallback((taskID: string) => {
        dispatch(deleteTask(props.toDoListID, taskID));
    }, [dispatch, props.toDoListID]);

    const updateTaskTitle = useCallback((taskID: string, title: string) => {
        dispatch(updateTask(props.toDoListID, taskID, {title}))
    }, [dispatch, props.toDoListID]);

    const changeStatus = useCallback((taskID: string, e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(props.toDoListID, taskID, e.currentTarget.checked ? {status: TaskStatuses.Completed} : {status: TaskStatuses.New}))
    }, [dispatch, props.toDoListID]);


    const onClickFilterAllTasks = useCallback(() => props.changeFilter(props.toDoListID, 'all'), [props.toDoListID, props.changeFilter]);
    const onClickFilterActiveTasks = useCallback(() => props.changeFilter(props.toDoListID, 'active'), [props.toDoListID, props.changeFilter]);
    const onClickFilterCompletedTasks = useCallback(() => props.changeFilter(props.toDoListID, 'completed'), [props.toDoListID, props.changeFilter]);

    const onClickRemoveToDoList = () => props.removeToDoList(props.toDoListID);
    const updateToDoListTitle = useCallback((title: string) => props.updateToDoListTitle(props.toDoListID, title), [props.updateToDoListTitle, props.toDoListID]);

    let tasksForTodolist = tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    const taskList = tasksForTodolist.map((t: TaskType) => {
        return (
            <Task key={t.id} taskId={t.id} title={t.title} status={t.status} changeStatus={changeStatus} updateTask={updateTaskTitle} removeTask={removeTask}/>
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
});