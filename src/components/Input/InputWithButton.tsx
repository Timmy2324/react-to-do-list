import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

export type InputPropsType = {
    callBack: (title:string) => void
    disabled?: boolean
    placeholder?: string
}

export const InputWithButton = memo((props: InputPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<boolean>(false);

    const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>;

    const addItem = () => {
        if (title) {
            props.callBack(title.trim());
        } else {
            setError(true);
        }
        setTitle('');
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
            <TextField
                fullWidth
                variant="standard"
                color={'info'}
                error={error}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddTask}
                helperText={error ? errorMessage : ' '}
                disabled={props.disabled ? props.disabled : false}
                placeholder={props.placeholder}
                autoComplete='off'
            />
            <IconButton size={'small'} color={'info'} onClick={addItem} disabled={props.disabled ? props.disabled : false}>
                <Add/>
            </IconButton>
        </div>
    )
});