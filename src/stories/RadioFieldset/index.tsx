import React from "react";
import Radio, { RadioProps } from "../Radio";
import "./index.scss";

export interface RadioFieldsetProps {
    title: string;
    radioProps: RadioProps[];
};

const RadioFieldset: React.FC<RadioFieldsetProps> = (props) => {
    return (
        <fieldset className="RadioFieldset radio-fieldset-container">
            <legend>{props.title}</legend>
            {
                props.radioProps.map((radioProp, index) => (
                    <Radio {...radioProp} key={index + "radio"} />
                ))
            }
        </fieldset>
    );
}

export default RadioFieldset;
