import React from "react";
import {Meta, Story} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = () => <App />;

export const Example = Template.bind({});
Example.args = {

};