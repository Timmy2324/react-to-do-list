import React, {useReducer} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {InputWithButton} from "./components/Input/InputWithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

    const toDoListID1 = v1();
    const toDoListID2 = v1();

    const [toDoLists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: toDoListID1, title: 'What to learn', filter: 'all'},
        {id: toDoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const addTask = (toDoListID: string, title: string) => {
        dispatchTasksReducer(addTaskAC(toDoListID, title));
    }

    const changeTaskStatus = (toDoListID: string, id: string, isDone: boolean) => {
        dispatchTasksReducer(changeTaskStatusAC(toDoListID, id, isDone));
    }

    const changeFilter = (toDoListID: string, filter: FilterValuesType) => {
        dispatchTodolistsReducer(changeTodolistFilterAC(toDoListID, filter));
    }

    const removeTask = (toDoListID: string, taskID: string) => {
        dispatchTasksReducer(removeTaskAC(toDoListID, taskID));
    }

    const removeToDoList = (toDoListID: string) => {
        dispatchTodolistsReducer(removeTodolistAC(toDoListID));
        dispatchTasksReducer(removeTodolistAC(toDoListID));
    }

    const updateTaskTitle = (toDoListID: string, taskID: string, title: string) => {
        dispatchTasksReducer(changeTaskTitleAC(toDoListID, taskID, title));
    }

    const updateToDoListTitle = (toDoListID: string, title: string) => {
        dispatchTodolistsReducer(changeTodolistTitleAC(toDoListID, title));
    }

    const addToDoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolistsReducer(action);
        dispatchTasksReducer(action)
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
                        let tasksForTodolist = tasks[list.id];

                        if (list.filter === "active") {
                            tasksForTodolist = tasks[list.id].filter(t => !t.isDone);
                        }
                        if (list.filter === "completed") {
                            tasksForTodolist = tasks[list.id].filter(t => t.isDone);
                        }


                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoList
                                        key={list.id}
                                        toDoListID={list.id}
                                        title={list.title}
                                        tasks={tasksForTodolist}
                                        filter={list.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeToDoList={removeToDoList}
                                        updateTaskTitle={updateTaskTitle}
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
