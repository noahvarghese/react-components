import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Select from ".";

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
