import React from "react";
import "./Checkbox.scss";
export interface CheckboxProps {
    name: string;
    label?: string;
    checked?: boolean;
    readonly?: boolean;
}
declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
