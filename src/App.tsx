import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {InputWithButton} from "./components/Input/InputWithButton";
import 'antd/dist/antd.css';
import {Col, Row} from "antd";

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
        <div className="App">
            <Row>
                <Col span={24}>
                    <InputWithButton buttonName={'+'} callBack={addToDoList}/>
                </Col>
            </Row>

            <Row>

                {toDoLists.map(list => {
                    let tasksForTodolist = tasks[list.id];

                    if (list.filter === "active") {
                        tasksForTodolist = tasks[list.id].filter(t => !t.isDone);
                    }
                    if (list.filter === "completed") {
                        tasksForTodolist = tasks[list.id].filter(t => t.isDone);
                    }


                    return (
                        <Col span={4}>
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
                        </Col>
                    )
                })}

            </Row>
        </div>
    );
}

export default App;
