import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "../Button/Button";

type InputPropsType = {
    callBack: (title:string) => void
    buttonName: string
}

export const InputWithButton = (props: InputPropsType) => {

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
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddTask}
            />
            <Button name={props.buttonName} callBack={addItem}/>
            {errorMessage}
        </div>
    )
}