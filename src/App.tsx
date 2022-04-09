import React, {useCallback} from 'react';
import './App.css';
import {ToDoList} from "./components/ToDoList/ToDoList";
import {InputWithButton} from "./components/Input/InputWithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, ToDoListDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const dispatch = useDispatch();
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListDomainType>>(state => state.toDoLists);


    const changeFilter = useCallback((toDoListID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(toDoListID, filter));
    }, [dispatch]);

    const removeToDoList = useCallback((toDoListID: string) => {
        dispatch(removeTodolistAC(toDoListID));
    }, [dispatch]);

    const updateToDoListTitle = useCallback((toDoListID: string, title: string) => {
        dispatch(changeTodolistTitleAC(toDoListID, title));
    }, [dispatch]);

    const addToDoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
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
            </Container>
        </div>
    );
}

export default App;
