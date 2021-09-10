import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RadioFieldset from ".";

export default {
    title: "RadioFieldset",
    component: RadioFieldset,
} as ComponentMeta<typeof RadioFieldset>;

const Template: ComponentStory<typeof RadioFieldset> = (args) => (
    <RadioFieldset {...args} />
);

export const Unselected = Template.bind({});
Unselected.args = {
    title: "RadioFieldset",
    radioProps: [
        {
            label: "Test 1",
            name: "Radio",
            id: "Test1",
            state: {
                state: true,
            },
        },
        {
            label: "Test 2",
            name: "Radio",
            id: "Test2",
            state: {
                state: false,
            },
        },
    ],
};
