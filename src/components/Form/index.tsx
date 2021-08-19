import React, { ReactNode, SyntheticEvent } from "react";
import "./index.scss";

export interface FormProps {
    title: string;
    method: "POST" | "PUT" | "DELETE";
    type: "card" | "bordered";
    url: string;
    submitFunction: (e: SyntheticEvent) => Promise<void>;
    buttons: ReactNode[];
}

const Form: React.FC<FormProps> = (props) => {
    return (
        <form
            className={"Form form-container " + props.type}
            method={props.method}
            action={props.url}
            onSubmit={props.submitFunction}
        >
            <h2>{props.title}</h2>
            <div className="form--contents">{props.children}</div>
            <div
                className={
                    "form-button-container" +
                    (props.buttons.length > 1
                        ? " buttons--multiple"
                        : " buttons--single")
                }
            >
                {props.buttons}
            </div>
        </form>
    );
};

export default Form;
