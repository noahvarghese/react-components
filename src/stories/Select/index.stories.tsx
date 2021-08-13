import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Select from ".";

export default {
    title: "Select",
    component: Select
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const DefaultSelectAppearance = Template.bind({});

DefaultSelectAppearance.args = {
    name: "department",
    placeholder: "Department",
    required: true,
    items: [{ id: 1, value: "Kitchen" }, { id: 2, value: "Bar" }],
    errorState: {
        value: "error"
    }
}