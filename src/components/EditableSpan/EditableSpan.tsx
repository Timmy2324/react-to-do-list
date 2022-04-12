import React, {useState, ChangeEvent, memo} from "react";
import {TextField} from "@mui/material";
import s from './EditableSpan.module.css';

export type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {

    const [title, setTitle] = useState<string>(props.title);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onDoubleClickHandler = () => {
        if (props.disabled) {
            return;
        }
        setIsEdit(true);
        setTitle(props.title);
    }

    const onBlurHandler = () => {
        setIsEdit(false);
        props.callBack(title.trim());
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return isEdit
        ? <TextField fullWidth className={s.text} variant="standard" value={title} autoFocus onBlur={onBlurHandler} onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={onDoubleClickHandler} className={s.text}>{props.title}</span>
});