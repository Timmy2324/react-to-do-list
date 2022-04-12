import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {DeleteOutline} from "@mui/icons-material";
import {TaskStatuses} from "../../../api/todolists-api";
import s from './Task.module.css';

export type TaskPropsType = {
    taskId: string,
    title: string,
    status: TaskStatuses,
    changeStatus: (taskId: string, e: ChangeEvent<HTMLInputElement>) => void,
    updateTask: (taskId: string, title: string) => void,
    removeTask: (taskId: string) => void,
    disabled?: boolean,
}

export const Task = memo((props: TaskPropsType) => {

    return (
        <div key={props.taskId} className={s.taskWrap}>
            <div className={s.textWrap}>
                <Checkbox
                    checked={props.status === TaskStatuses.Completed}
                    onChange={(e) => props.changeStatus(props.taskId, e)}
                    disabled={props.disabled}
                />
                <EditableSpan
                    callBack={(title) => props.updateTask(props.taskId, title)}
                    title={props.title}
                    disabled={props.disabled}
                />
            </div>
            <IconButton
                onClick={() => props.removeTask(props.taskId)}
                disabled={props.disabled}
            >
                <DeleteOutline />
            </IconButton>
        </div>
    );
});