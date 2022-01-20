import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Input} from 'antd';
import {PlusSquareOutlined} from "@ant-design/icons";


type InputPropsType = {
    callBack: (title: string) => void
    buttonName: string,
    placeholder?: string
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
            <Input.Group compact>
                <Input onChange={onChangeSetTitle} style={{ width: 'calc(100% - 32px)' }}
                       onKeyPress={onKeyPressAddTask} value={title} placeholder={props.placeholder}/>
                <Button type="primary" icon={<PlusSquareOutlined/>} onClick={addItem}/>
            </Input.Group>
            {errorMessage}
        </div>
    )
}