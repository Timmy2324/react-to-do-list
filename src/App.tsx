import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}


export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const toDoListTitle: string = 'What to learn';

    let toDoListID1=v1();
    let toDoListID2=v1();

    let [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
        {id: toDoListID1, title: 'What to learn', filter: 'all'},
        {id: toDoListID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [toDoListID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [toDoListID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function addTask(toDoListID: string, title: string) {
        setTasks({...tasks, [toDoListID]: [{id: v1(), title, isDone: false},...tasks[toDoListID]]});
    }

    function changeTaskStatus(toDoListID: string, id: string, isDone: boolean) {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].map(task => task.id === id ? {...task, isDone} : task)});
    }

    function changeFilter(toDoListID: string, filter: FilterValuesType) {
        setToDoLists(toDoLists.map(list => list.id === toDoListID ? {...list, filter} : list));
    }

    function removeTask(toDoListID: string, id: string) {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter(task => task.id !== id)});
    }

    function removeToDoList(toDoListID: string) {
        setToDoLists(toDoLists.filter(list => list.id !== toDoListID));
        delete tasks[toDoListID];
    }


    return (
        <div className="App">
            {toDoLists.map(list => {

                let tasksForTodolist = tasks[list.id];

                if (list.filter === "active") {
                    tasksForTodolist = tasks[list.id].filter(t => !t.isDone);
                }
                if (list.filter === "completed") {
                    tasksForTodolist = tasks[list.id].filter(t => t.isDone);
                }


                return (
                    <ToDoList
                        key={list.id}
                        toDoListID={list.id}
                        title={toDoListTitle}
                        tasks={tasksForTodolist}
                        filter={list.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeToDoList={removeToDoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
