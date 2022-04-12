import React, {useCallback, useEffect} from 'react';
import {Grid} from "@mui/material";
import {InputWithButton} from "../Input/InputWithButton";
import {ToDoList} from "../ToDoList/ToDoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    changeTodolistFilterAC, changeToDoListTitle, createToDoList, deleteToDoList,
    fetchToDoLists,
    FilterValuesType,
    ToDoListDomainType
} from "../ToDoList/reducers/todolists-reducer";

type PropsType = {
    demo?: boolean
}

export const ToDoListsList: React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useDispatch();
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListDomainType>>(state => state.toDoLists);


    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchToDoLists());
    }, []);

    const changeFilter = useCallback((toDoListID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(toDoListID, filter));
    }, [dispatch]);

    const removeToDoList = useCallback((toDoListID: string) => {
        dispatch(deleteToDoList(toDoListID));
    }, [dispatch]);

    const updateToDoListTitle = useCallback((toDoListID: string, title: string) => {
        dispatch(changeToDoListTitle(toDoListID, title));
    }, [dispatch]);

    const addToDoList = useCallback((title: string) => {
        dispatch(createToDoList(title));
    }, [dispatch]);


    return (
        <>
            <Grid container style={{paddingTop: '20px'}}>
                <InputWithButton callBack={addToDoList} placeholder={'Enter ToDoList title'}/>
            </Grid>
            <Grid container spacing={2}>
                {toDoLists.map(list => {
                    return (
                        <Grid key={list.id} item>
                            <ToDoList
                                key={list.id}
                                toDoList={list}
                                changeFilter={changeFilter}
                                removeToDoList={removeToDoList}
                                updateToDoListTitle={updateToDoListTitle}
                                demo={demo}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};