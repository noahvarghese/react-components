import React from "react";
import { useState } from "react";
import { ErrorProps } from "../../types/error";
import { StateProps } from "../../types/state";
import DropdownArrow from "../DropdownArrow";
import "./index.scss";

interface SelectProps {
    name: string;
    placeholder: string;
    items: { id: number; value: any }[];
    required: boolean;
    errorState?: ErrorProps;
    state: StateProps;
}

const Select: React.FC<SelectProps> = (props) => {
    const [open, setOpen] = useState(false);
    const [selectRef, setSelectRef] = useState<HTMLSelectElement | null>(null);
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
    const [inputVal, setInputVal] = useState("");

    return (
        <div
            className="Select select-container"
            onClick={(e) => {
                if (!open) {
                    inputRef?.focus();
                }
                e.preventDefault();
                e.stopPropagation();
            }}
            onFocus={(e) => {
                setOpen(true);
                e.preventDefault();
                e.stopPropagation();
            }}
            onBlur={(e) => {
                setOpen(false);
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            {props.errorState && props.errorState.value && (
                <div className="error-message">
                    <p>{props.errorState.value}</p>
                </div>
            )}
            <div className={(open ? "show " : "") + "option-list"}>
                {props.items.map(({ id, value }) => (
                    <div
                        className={
                            (props.state.value === value ? "selected " : "") +
                            "option"
                        }
                        key={id}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <input
                type="text"
                ref={setInputRef}
                defaultValue=""
                onKeyDown={(e) => {
                    if (e.key === "Escape" && inputRef) {
                        inputRef.blur();
                    }

                    const val =
                        e.currentTarget.value +
                        (e.key.length === 1
                            ? e.key
                            : e.key === "Backspace"
                            ? e.currentTarget.value.substring(
                                  0,
                                  e.currentTarget.value.length - 2
                              )
                            : "");
                    setInputVal(val);

                    if (val === "" && props.required && props.errorState) {
                        props.errorState.setError("Field cannot be left empty");
                        return;
                    }

                    const item = props.items.find(({ value }) => value === val);

                    if (props.errorState) {
                        if (item === undefined) {
                            props.errorState.setError("Invalid entry");
                            return;
                        } else {
                            props.errorState.setError("");
                        }
                    }
                }}
            />
            <select
                ref={setSelectRef}
                defaultValue=""
                name={props.name}
                className={
                    (props.errorState && props.errorState.value
                        ? "error "
                        : "") +
                    (open ? "show " : "") +
                    (inputVal.trim() !== "" ? "has-input " : "") +
                    (props.state.value.value !== "" ? "selected" : "")
                }
            >
                {[{ id: -1, value: "" }, ...props.items].map(
                    ({ id, value }, index) => (
                        <option
                            key={id}
                            value={value}
                            disabled={index === 0}
                            hidden={index === 0}
                        >
                            {value}
                        </option>
                    )
                )}
            </select>
            <label
                htmlFor={props.name}
                className={
                    props.errorState && props.errorState.value ? "error" : ""
                }
            >
                <span>{(props.required && "* ") + props.placeholder}</span>
            </label>
            <DropdownArrow
                show={open}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOpen(!open);
                }}
            />
        </div>
    );
};

export default Select;
