import React, { SyntheticEvent } from "react";

export interface FormProps {
    title: string;
    method: "POST" | "PUT" | "DELETE";
    type: "card";
    url: string;
    submitFunction: (e: SyntheticEvent) => Promise<void>;
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
            {props.children}
        </form>
    );
};

export default Form;
