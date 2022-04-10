import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
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

export const ToDoListsList: React.FC = () => {

    const dispatch = useDispatch();
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListDomainType>>(state => state.toDoLists);


    useEffect(() => {
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
            <Grid container style={{padding: '20px'}}>
                <InputWithButton callBack={addToDoList}/>
            </Grid>
            <Grid container spacing={3}>
                {toDoLists.map(list => {

                    return (
                        <Grid key={list.id} item>
                            <Paper style={{padding: '10px'}}>
                                <ToDoList
                                    key={list.id}
                                    toDoListID={list.id}
                                    title={list.title}
                                    filter={list.filter}
                                    changeFilter={changeFilter}
                                    removeToDoList={removeToDoList}
                                    updateToDoListTitle={updateToDoListTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};