import React from "react";
import {InputPropsType, InputWithButton} from "./InputWithButton";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'InputWithButton Component',
    component: InputWithButton,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        }
    },
} as Meta

const Template: Story<InputPropsType> = (args) => <InputWithButton {...args} />;

export const Example = Template.bind({});
Example.args = {
    callBack: action('button add was pressed'),
};