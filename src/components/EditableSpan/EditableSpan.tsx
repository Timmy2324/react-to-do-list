import React, {useState, ChangeEvent, memo} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
    className?: string
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {

    const [title, setTitle] = useState<string>(props.title);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onDoubleClickHandler = () => {
        setIsEdit(true);
    }

    const onBlurHandler = () => {
        setIsEdit(false);
        props.callBack(title);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value.trim());
    }

    return isEdit
        ? <TextField variant="standard" value={title} autoFocus onBlur={onBlurHandler} onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={onDoubleClickHandler} className={props.className}>{title}</span>
});