import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {InputWithButton} from "./components/Input/InputWithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const toDoListID1 = v1();
    const toDoListID2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
        {id: toDoListID1, title: 'What to learn', filter: 'all'},
        {id: toDoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
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
        setTasks({...tasks, [toDoListID]: [{id: v1(), title, isDone: false}, ...tasks[toDoListID]]});
    }

    const changeTaskStatus = (toDoListID: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].map(task => task.id === id ? {...task, isDone} : task)});
    }

    const changeFilter = (toDoListID: string, filter: FilterValuesType) => {
        setToDoLists(toDoLists.map(list => list.id === toDoListID ? {...list, filter} : list));
    }

    const removeTask = (toDoListID: string, taskID: string) => {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter(task => task.id !== taskID)});
    }

    const removeToDoList = (toDoListID: string) => {
        setToDoLists(toDoLists.filter(list => list.id !== toDoListID));
        delete tasks[toDoListID];
    }

    const updateTaskTitle = (toDoListID: string, taskID: string, title: string) => {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].map(task => task.id === taskID ? {...task, title} : task)});
    }

    const updateToDoListTitle = (toDoListID: string, title: string) => {
        setToDoLists(toDoLists.map(list => list.id === toDoListID ? {...list, title} : list))
    }

    const addToDoList = (title: string) => {
        const ToDoListID = v1();
        setToDoLists([...toDoLists, {
            id: ToDoListID,
            title,
            filter: 'all'
        }]);
        setTasks({...tasks, [ToDoListID]: []});
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
