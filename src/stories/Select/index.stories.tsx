import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Select from ".";
import { ValidationProps } from "../../types/validation";

let validatorOptions: ValidationProps = {
    validator: (
        item: any,
        options: { id: number; value: any }[]
    ): { success: true } | { success: false; errorMessage: string } => {
        if (!item) {
            return { success: false, errorMessage: "Field cannot be blank" };
        }

        if (options.find(({ value }) => value === item)) {
            return { success: true };
        }

        return {
            success: false,
            errorMessage: "Invalid selection",
        };
    },
    runOnInput: false,
    runOnComplete: true,
};

const DeptSelect: React.FC = () => {
    const [selected, setSelected] = useState({ id: -1, value: "" });
    const [error, setError] = useState("");

    return (
        <Select
            items={[
                { id: 1, value: "Kitchen" },
                { id: 2, value: "Bar" },
            ]}
            name="department"
            placeholder="department"
            required={true}
            state={{ value: selected, setState: setSelected }}
            errorState={{ setError, value: error }}
        />
    );
};
export default {
    title: "Select",
    component: DeptSelect,
} as ComponentMeta<typeof DeptSelect>;

const Template: ComponentStory<typeof DeptSelect> = (args) => (
    <DeptSelect {...args} />
);

export const NewDept = Template.bind({});
