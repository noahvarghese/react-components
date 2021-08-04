import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from ".";

export default {
    title: "Button",
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    text: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
    primary: false,
    text: "Button",
};

export const Large = Template.bind({});
Large.args = {
    size: "large",
    text: "Button",
};

export const Medium = Template.bind({});
Medium.args = {
    size: "medium",
    text: "Button",
};

export const Small = Template.bind({});
Small.args = {
    size: "small",
    text: "Button",
};
