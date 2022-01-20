import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {InputWithButton} from "./components/Input/InputWithButton";
import {Button, Card, Checkbox, Radio} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {CheckboxChangeEvent} from "antd/es/checkbox";

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
    const changeStatus = (taskID: string, e: CheckboxChangeEvent) => props.changeTaskStatus(props.toDoListID, taskID, e.target.checked);

    const getSpanClass = (isDone: boolean) => {
        return isDone ? 'is-done' : '';
    }

    const taskList = props.tasks.map((t: TaskType) => {
        return (
            <li key={t.id}>
                <Checkbox
                    type="checkbox"
                    checked={t.isDone}
                    onChange={(e) => changeStatus(t.id, e)}
                />
                <EditableSpan callBack={(title) => updateTask(t.id, title)} className={getSpanClass(t.isDone)}
                              title={t.title}/>
                <Button type="primary" shape="circle" icon={<DeleteOutlined/>} size={'small'}
                        onClick={() => removeTask(t.id)}/>
            </li>
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
        <Card title={
            <h3>
                <EditableSpan title={props.title} callBack={updateToDoListTitle}/>
                <Button type="primary" shape="circle" icon={<DeleteOutlined/>} size={'small'}
                        onClick={onClickRemoveToDoList}/>
            </h3>
        } style={{width: 300}} bordered={false}>

            <InputWithButton placeholder={'Введите текст задачи'} buttonName={'+'} callBack={addTask}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <Radio.Group defaultValue="All" buttonStyle="solid">
                    <Radio.Button value="All"
                                  onClick={onClickFilterAllTasks}>All</Radio.Button>
                    <Radio.Button value="Active"
                                  onClick={onClickFilterActiveTasks}>Active</Radio.Button>
                    <Radio.Button value="Completed"
                                  onClick={onClickFilterCompletedTasks}>Completed</Radio.Button>
                </Radio.Group>
            </div>
        </Card>
    )
}