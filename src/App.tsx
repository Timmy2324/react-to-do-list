import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {InputWithButton} from "./components/Input/InputWithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ToDoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const dispatch = useDispatch();
    const toDoLists = useSelector<AppRootStateType, Array<ToDoListsType>>(state => state.toDoLists);


    const changeFilter = (toDoListID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(toDoListID, filter));
    }

    const removeToDoList = (toDoListID: string) => {
        dispatch(removeTodolistAC(toDoListID));
    }

    const updateToDoListTitle = (toDoListID: string, title: string) => {
        dispatch(changeTodolistTitleAC(toDoListID, title));
    }

    const addToDoList = (title: string) => {
        dispatch(addTodolistAC(title));
    }


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
                            <Grid item>
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
