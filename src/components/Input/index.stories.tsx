import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from ".";

let validatorOptions = {
    runOnComplete: true,
    runOnInput: false,
};

const EmailInput: React.FC = () => {
    const [emailState, setEmail] = useState("");
    const [error, setError] = useState("");

    return (
        <Input
            type="email"
            required={true}
            name="email"
            state={{ setState: setEmail, state: emailState }}
            validationOptions={validatorOptions}
            errorState={{ setError: setError, error }}
            placeholder="email"
        />
    );
};

const DateInput: React.FC = () => {
    const [state, setState] = useState<Date | string>("");
    const [error, setError] = useState("");

    return (
        <Input
            type="date"
            required={true}
            name="date"
            state={{
                setState,
                state:
                    state instanceof Date
                        ? `${(state as Date).getFullYear()}-${(state as Date).getMonth()}-${(state as Date).getDay()}`
                        : (state as string),
            }}
            errorState={{ error, setError }}
            validationOptions={{ runOnInput: true, runOnComplete: true }}
            placeholder="date"
        />
    );
};

export default {
    title: "Input",
    component: EmailInput,
} as ComponentMeta<typeof EmailInput>;

const Template: ComponentStory<typeof EmailInput> = (args) => (
    <EmailInput {...args} />
);
export const Email = Template.bind({});

const DateTemplate: ComponentStory<typeof DateInput> = (args) => (
    <DateInput {...args} />
);
export const Date = DateTemplate.bind({});
