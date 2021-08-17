import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Radio from ".";

export default {
    title: "Radio",
    component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Unselected = Template.bind({});
Unselected.args = {
    readonly: false,
    label: "Radio",
    name: "Radio",
    id: "Radio"
};