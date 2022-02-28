import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteOutline} from "@mui/icons-material";

type TaskPropsType = {
    taskId: string,
    title: string,
    isDone: boolean,
    changeStatus: (taskId: string, e: ChangeEvent<HTMLInputElement>) => void,
    updateTask: (taskId: string, title: string) => void,
    removeTask: (taskId: string) => void,
}

export const Task = memo((props: TaskPropsType) => {


    const getSpanClass = (isDone: boolean) => {
        return isDone ? 'is-done' : '';
    }

    return (
        <div key={props.taskId}>
            <Checkbox
                checked={props.isDone}
                onChange={(e) => props.changeStatus(props.taskId, e)}
            />
            <EditableSpan callBack={(title) => props.updateTask(props.taskId, title)} className={getSpanClass(props.isDone)}
                          title={props.title}/>
            <IconButton onClick={() => props.removeTask(props.taskId)}><DeleteOutline /></IconButton>
        </div>
    );
});