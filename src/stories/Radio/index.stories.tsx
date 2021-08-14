import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Radio from ".";

export default {
    title: "Radio",
    component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Selected = Template.bind({});
Selected.args = {
    // selected: true,
    readonly: false,
    label: "Radio",
    name: "Radio",
};

export const Unselected = Template.bind({});
Unselected.args = {
    readonly: false,
    label: "Radio",
    name: "Radio",
};

export const ReadOnlySelected = Template.bind({});
ReadOnlySelected.args = {
    readonly: true,
    // selected: true,
    label: "Radio",
    name: "Radio",
};

export const ReadOnlyUnselected = Template.bind({});
ReadOnlyUnselected.args = {
    readonly: true,
    // selected: false,
    label: "Radio",
    name: "Radio",
};
