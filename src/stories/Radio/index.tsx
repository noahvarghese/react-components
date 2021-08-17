import React from "react";
import { StateProps } from "../../types/state";
import "./index.scss";

export interface RadioProps {
    name: string;
    id: string;
    label?: string;
    state: StateProps<boolean>;
    readonly?: boolean;
}

const Radio: React.FC<RadioProps> = (props) => {
    return (
        <div className="Radio radio-container">
            <input
                type="radio"
                id={props.id}
                name={props.name}
                checked={props.state.value}
                onChange={(_) => {
                    if (!props.readonly) {
                        props.state.setState(!props.state.value);
                    }
                }}
                readOnly={props.readonly}
            />
            <label htmlFor={props.id}>{props.label ?? props.name}</label>
        </div>
    );
};

export default Radio;;