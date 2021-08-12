import React, { useState } from 'react';
import validator from "validator";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from ".";
// import { useState } from '@storybook/addons';

// export default {
//     title: "Input",
//     component: Input,
// } as ComponentMeta<typeof Input>;

let validatorOptions = {
    validator: (item: any): { success: true; } | { success: false; errorMessage: string } => {
        let success = false;
        let errorMessage: string;

        if ((item as string).trim() === "") {
            errorMessage = "Field cannot be empty";

            return {
                success,
                errorMessage: errorMessage ?? undefined
            }
        }

        const isEmail = validator.isEmail(item);

        if (isEmail) {
            success = true;
        }
        else {
            errorMessage = "Invalid email address";
        }

        return {
            success,
            errorMessage: errorMessage ?? undefined
        }
    },
    runOnComplete: true,
    runOnInput: false
}

const EmailInput: React.FC = () => {
    const [emailState, setEmail] = useState("");
    const [error, setError] = useState("");


    return <Input type="email" required={true} name="email" state={{ setState: setEmail, value: emailState }} validationOptions={validatorOptions} errorState={{ setError: setError, value: error }} placeholder="email" />
}

export default {
    title: "Input",
    component: EmailInput
} as ComponentMeta<typeof EmailInput>

const Template: ComponentStory<typeof EmailInput> = (args) => <EmailInput {...args} />
export const Email = Template.bind({});
