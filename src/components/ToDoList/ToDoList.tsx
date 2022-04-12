import React, {ChangeEvent, memo, useCallback, useEffect} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {InputWithButton} from "../Input/InputWithButton";
import {DeleteOutline} from "@mui/icons-material";
import {Button, ButtonGroup, IconButton, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    createTask, deleteTask,
    fetchTasks, updateTask,
} from "./reducers/tasks-reducer";
import {Task} from "./Task/Task";
import {FilterValuesType, ToDoListDomainType} from "./reducers/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import s from './ToDoList.module.css';

type ToDoListPropsTypes = {
    toDoList: ToDoListDomainType
    changeFilter: (toDoListID: string, filter: FilterValuesType) => void
    removeToDoList: (toDoListID: string) => void
    updateToDoListTitle: (toDoListID: string, title: string) => void
    demo?: boolean
}

export const ToDoList = memo(({demo = false, ...props}: ToDoListPropsTypes) => {

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.toDoList.id]);
    const disabled = props.toDoList.entityStatus === 'loading';

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasks(props.toDoList.id));
    }, []);

    const addTask = useCallback((title: string) => {
        dispatch(createTask(props.toDoList.id, title));
    }, [dispatch, props.toDoList.id]);

    const removeTask = useCallback((taskID: string) => {
        dispatch(deleteTask(props.toDoList.id, taskID));
    }, [dispatch, props.toDoList.id]);

    const updateTaskTitle = useCallback((taskID: string, title: string) => {
        dispatch(updateTask(props.toDoList.id, taskID, {title}))
    }, [dispatch, props.toDoList.id]);

    const changeStatus = useCallback((taskID: string, e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(props.toDoList.id, taskID, e.currentTarget.checked ? {status: TaskStatuses.Completed} : {status: TaskStatuses.New}))
    }, [dispatch, props.toDoList.id]);


    const onClickFilterAllTasks = useCallback(() => props.changeFilter(props.toDoList.id, 'all'), [props.toDoList.id, props.changeFilter]);
    const onClickFilterActiveTasks = useCallback(() => props.changeFilter(props.toDoList.id, 'active'), [props.toDoList.id, props.changeFilter]);
    const onClickFilterCompletedTasks = useCallback(() => props.changeFilter(props.toDoList.id, 'completed'), [props.toDoList.id, props.changeFilter]);

    const onClickRemoveToDoList = () => props.removeToDoList(props.toDoList.id);
    const updateToDoListTitle = useCallback((title: string) => props.updateToDoListTitle(props.toDoList.id, title), [props.updateToDoListTitle, props.toDoList.id]);

    let tasksForTodolist = tasks;

    if (props.toDoList.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.toDoList.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    const taskList = tasksForTodolist.map((t: TaskType) => {
        return (
            <Task
                key={t.id}
                taskId={t.id}
                title={t.title}
                status={t.status}
                changeStatus={changeStatus}
                updateTask={updateTaskTitle}
                removeTask={removeTask}
                disabled={disabled}
            />
        )
    })

    return (
        <Paper style={{padding: '10px', maxWidth: '255px'}}>
            <h3 className={s.toDoListTitle}>
                <EditableSpan title={props.toDoList.title} callBack={updateToDoListTitle} disabled={disabled}/>
                <IconButton onClick={onClickRemoveToDoList} disabled={disabled}>
                    <DeleteOutline />
                </IconButton>
            </h3>
            <InputWithButton callBack={addTask} disabled={disabled} placeholder={'Enter task title'}/>
            <div>
                {taskList}
            </div>
            <ButtonGroup>
                <Button
                    color={'secondary'}
                    variant={props.toDoList.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onClickFilterAllTasks}
                >
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.toDoList.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onClickFilterActiveTasks}
                >
                    Active
                </Button>
                <Button
                    color={'success'}
                    variant={props.toDoList.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onClickFilterCompletedTasks}
                >
                    Completed
                </Button>
            </ButtonGroup>
        </Paper>
    )
});