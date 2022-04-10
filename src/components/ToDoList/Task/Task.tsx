import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {DeleteOutline} from "@mui/icons-material";
import {TaskStatuses} from "../../../api/todolists-api";

export type TaskPropsType = {
    taskId: string,
    title: string,
    status: TaskStatuses,
    changeStatus: (taskId: string, e: ChangeEvent<HTMLInputElement>) => void,
    updateTask: (taskId: string, title: string) => void,
    removeTask: (taskId: string) => void,
}

export const Task = memo((props: TaskPropsType) => {

    //
    // const getSpanClass = (isDone: boolean) => {
    //     return isDone ? 'is-done' : '';
    // }

    return (
        <div key={props.taskId}>
            <Checkbox
                checked={props.status === TaskStatuses.Completed}
                onChange={(e) => props.changeStatus(props.taskId, e)}
            />
            <EditableSpan callBack={(title) => props.updateTask(props.taskId, title)}
                          title={props.title}/>
            <IconButton onClick={() => props.removeTask(props.taskId)}><DeleteOutline /></IconButton>
        </div>
    );
});