import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Checkbox from ".";

export default {
    title: "Checkbox",
    component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
    <Checkbox {...args} />
);

export const Checked = Template.bind({});
Checked.args = {
    checked: true,
    label: "Checkbox",
    name: "Checkbox",
};

export const Unchecked = Template.bind({});
Unchecked.args = {
    label: "Checkbox",
    name: "Checkbox",
};

export const ReadOnlyChecked = Template.bind({});
ReadOnlyChecked.args = {
    readonly: true,
    checked: true,
    label: "Checkbox",
    name: "Checkbox",
};

export const ReadOnlyUnchecked = Template.bind({});
ReadOnlyUnchecked.args = {
    readonly: true,
    checked: false,
    label: "Checkbox",
    name: "Checkbox",
};
