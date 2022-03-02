import React from "react";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    argTypes: {
        onClick: {
            description: 'Span was added'
        }
    }
} as Meta

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>;


export const Example = Template.bind({});
Example.args = {
    title: 'Editable span',
    callBack: action('Span was added'),
}