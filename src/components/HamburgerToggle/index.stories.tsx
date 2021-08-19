import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import HamburgerToggle from ".";

export default {
    title: "HamburgerToggle",
    component: HamburgerToggle,
} as ComponentMeta<typeof HamburgerToggle>;

const Template: ComponentStory<typeof HamburgerToggle> = (args) => (
    <HamburgerToggle {...args} />
);

export const ClosedToggle = Template.bind({});
ClosedToggle.args = {
    showMenu: false,
};

export const OpenToggle = Template.bind({});
OpenToggle.args = {
    showMenu: true,
};
