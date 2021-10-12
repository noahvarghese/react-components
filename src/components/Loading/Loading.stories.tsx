import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Loading from ".";

export default {
    title: "Loading",
    component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
    <Loading {...args} />
);

export const Load = Template.bind({});
