import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Form, { FormProps } from "./";
import Input from "../Input";
import Button from "../Button";
import Checkbox from "../Checkbox";

export default {
    title: "Form",
    component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args: FormProps) => {
    return <Form {...args} />;
};

export const CardFormSingleButton = Template.bind({});

CardFormSingleButton.args = {
    title: "Form",
    type: "card",
    url: "",
    method: "POST",
    submitFunction: () => {
        console.log("Submitted");
    },
    children: <p>HELLO</p>,
    buttons: [<Button primary size="large" type="submit" text="Login" />],
};

export const CardFormMultipleButtons = Template.bind({});

CardFormMultipleButtons.args = {
    title: "Form",
    type: "card",
    url: "",
    method: "POST",
    submitFunction: () => console.log("Submitted"),
    children: (
        <>
            <Input
                type="email"
                name="email"
                required
                placeholder="email"
                state={{ state: "", setState: () => console.log("changed") }}
                errorState={{
                    setError: console.error,
                    error: "",
                }}
            />
            <Checkbox
                state={{
                    setState: () => {
                        return;
                    },
                    state: false,
                }}
                name="Checkbox"
                label="Checkbox"
            />
            <Input
                type="password"
                name="password"
                required
                placeholder="password"
                state={{ state: "", setState: () => console.log("changed") }}
            />
        </>
    ),
    buttons: [
        <Button primary size="large" type="submit" text="Login" />,
        <Button size="large" type="button" text="Register" />,
    ],
};
