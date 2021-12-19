import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const toDoListTitle: string = 'What to learn';

    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {
            id: 1,
            title: 'HTML&CSS',
            isDone: true,
        },
        {
            id: 2,
            title: 'JS',
            isDone: true,
        },
        {
            id: 3,
            title: 'ReactJS',
            isDone: false,
        },
        {
            id: 4,
            title: 'Rest API',
            isDone: false,
        },
        {
            id: 5,
            title: 'GraphQL',
            isDone: false,
        },
    ]);

    let taskForToDoList = tasks;

    function changeFilter(filter: FilterValuesType) {
        setFilter(filter);
    }

    function removeTask(id: number) {
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
            />
        </div>
    );
}

export default App;
