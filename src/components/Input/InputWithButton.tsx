import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type InputPropsType = {
    callBack: (title:string) => void
}

export const InputWithButton = memo((props: InputPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<boolean>(false);

    const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>;

    const addItem = () => {
        if (title) {
            props.callBack(title);
        } else {
            setError(true);
        }
        setTitle('');
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value.trim())
        setError(false)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant="standard"
                color={'info'}
                error={error}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddTask}
                helperText={error ? errorMessage : ' '}
            />
            <IconButton size={'small'} color={'info'} onClick={addItem}><Add/></IconButton>
        </div>
    )
});