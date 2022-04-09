import React from 'react';
import {Task, TaskPropsType} from "./Task";
import {action} from "@storybook/addon-actions";
import {Meta, Story} from "@storybook/react";
import {TaskStatuses} from "../../api/todolists-api";


export default {
    title: 'Task Component',
    component: Task,
} as Meta

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

export const TaskDoneExample = Template.bind({});
TaskDoneExample.args = {
    taskId: '1',
    title: 'task 1',
    status: TaskStatuses.New,
    changeStatus: action('task status was changed'),
    updateTask: action('task title was changed'),
    removeTask: action('task was removed'),
}