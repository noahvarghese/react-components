import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import DropdownArrow from "./";

export default {
    title: "DropdownArrow",
    component: DropdownArrow
} as ComponentMeta<typeof DropdownArrow>;

const Template: ComponentStory<typeof DropdownArrow> = args => <DropdownArrow {...args} />

export const DownArrow = Template.bind({});
DownArrow.args = {
    show: false,
    onClick: (_) => undefined,
}

export const UpArrow = Template.bind({});
UpArrow.args = {
    show: true,
    onClick: (_) => undefined,
}