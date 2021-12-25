import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const toDoListTitle: string = 'What to learn';

    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {
            id: v1(),
            title: 'HTML&CSS',
            isDone: true,
        },
        {
            id: v1(),
            title: 'JS',
            isDone: true,
        },
        {
            id: v1(),
            title: 'ReactJS',
            isDone: false,
        },
        {
            id: v1(),
            title: 'Rest API',
            isDone: false,
        },
        {
            id: v1(),
            title: 'GraphQL',
            isDone: false,
        },
    ]);

    let taskForToDoList = tasks;

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function changeFilter(filter: FilterValuesType) {
        setFilter(filter);
    }

    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    function getTaskForRender() {
        switch (filter) {
            case 'completed':
                return taskForToDoList = tasks.filter(t => t.isDone);
            case 'active':
                return taskForToDoList = tasks.filter(t => !t.isDone);
            default:
                return tasks;
        }
    }

    return (
        <div className="App">
            <ToDoList
                title={toDoListTitle}
                tasks={getTaskForRender()}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}

            />
        </div>
    );
}

export default App;
