import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import FileInput from ".";

export default {
    title: "File Input",
    component: FileInput,
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => (
    <FileInput {...args} />
);

export const MultipleFilesAllowed = Template.bind({});
MultipleFilesAllowed.args = {
    accept: "*",
    multipleFiles: true,
    name: "Files",
};
