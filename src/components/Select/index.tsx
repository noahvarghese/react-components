import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { ErrorProps } from "../../types/error";
import { stopBubbling } from "../../util/error";
import { StateProps } from "../../types/state";
import DropdownArrow from "../DropdownArrow";
import "./index.scss";
import OptionList from "./Option";
import { useMemo } from "react";

interface SelectProps {
    name: string;
    placeholder: string;
    items: { id: number; value: any }[];
    required: boolean;
    errorState?: ErrorProps;
    // here value will
    state: StateProps<{ id: number; value: string }>;
}

const Select: React.FC<SelectProps> = (props) => {
    // sets whether the dropdown is displayed as well as arrow state
    const [open, setOpen] = useState(false);
    // reference to HTMLSelectElement
    const [selectRef, setSelectRef] = useState<HTMLSelectElement | null>(null);
    // reference to HTMLInputElement
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
    // HTMLInputElement value
    const [inputValue, setInputValue] = useState("");

    const setInput = useCallback(
        (newVal: string) => {
            if (inputRef) {
                setInputValue(newVal);
                inputRef.value = newVal;
            }
        },
        [inputRef, setInputValue]
    );

    // controls main classes
    const selectClassName = useMemo(() => {
        const classes = [];

        if (props.errorState && props.errorState.value) classes.push("error");
        if (open) classes.push("show");
        if (inputRef?.value !== "") classes.push("has-input");
        if (props.state.value.value !== "") classes.push("has-selected");

        return classes.join(" ");
    }, [props.errorState, inputRef, props.state, open]);

    // gets called when typing or on blur
    const checkForErrors = useCallback(
        (newVal?: string): boolean => {
            if (props.errorState) {
                const val = newVal ?? inputRef?.value ?? "";
                if (props.required && val === "") {
                    props.errorState.setError("Field cannot be left empty");
                    return false;
                }

                const item = props.items.find(({ value }) =>
                    (value as string).toLowerCase().includes(val.toLowerCase())
                );

                if (item === undefined) {
                    props.errorState.setError("Invalid entry");
                    return false;
                } else {
                    props.errorState.setError("");
                    return true;
                }
            }
            return true;
        },
        [props.errorState, props.items, props.required, inputRef]
    );

    // gets called on click
    const optionClicked = useCallback(
        (item: { id: number; value: string }) => {
            props.state.setState(item);
            props.errorState?.setError("");
            setInput(item.value);
            setOpen(false);
            inputRef?.blur();
        },
        [setInput, props.state, props.errorState, inputRef]
    );

    useEffect(() => {
        setInput(props.state.value.value);
        if (selectRef) {
            if (props.state.value.id > 0) {
                selectRef.selectedIndex = props.state.value.id;
            } else {
                selectRef.selectedIndex = 0;
            }
        }
    }, [props.state.value, setInput, selectRef]);

    return (
        <div
            className={
                (props.errorState?.value ? "error " : "") +
                "Select select-container"
            }
            onClick={(e) => {
                if (!open) inputRef?.focus();
                stopBubbling(e);
            }}
            onFocus={(e) => {
                setOpen(true);
                stopBubbling(e);
            }}
            onBlur={(e) => {
                setOpen(false);
                stopBubbling(e);
            }}
        >
            {props.errorState && props.errorState.value && (
                <div className="error-message">
                    <p>{props.errorState.value}</p>
                </div>
            )}

            <OptionList
                items={props.items}
                selected={{
                    id: props.state.value.id,
                    value: props.state.value.value,
                }}
                inputValue={inputValue}
                visible={open}
                setSelected={optionClicked}
            />

            <input
                type="text"
                ref={setInputRef}
                defaultValue={inputValue}
                onKeyDown={(e) => {
                    // handles scrolling
                    if (e.key === "ArrowDown") {
                        const currentIndex = props.items.indexOf(
                            props.items.find(
                                ({ value }) => value === props.state.value.value
                            )!
                        );

                        if (currentIndex >= props.items.length - 1) {
                            props.state.setState(props.items[0]);
                        } else {
                            props.state.setState(props.items[currentIndex + 1]);
                        }
                    } else if (e.key === "ArrowUp") {
                        const currentIndex = props.items.indexOf(
                            props.items.find(
                                ({ value }) => value === props.state.value.value
                            )!
                        );

                        if (currentIndex <= 0) {
                            props.state.setState(
                                props.items[props.items.length - 1]
                            );
                        } else {
                            props.state.setState(props.items[currentIndex - 1]);
                        }
                    } else if (
                        e.key === "Enter" ||
                        e.key === "Escape" ||
                        e.key === "Tab"
                    ) {
                        // handles end validation
                        inputRef?.blur();

                        if (checkForErrors()) {
                            props.state.setState(
                                // checks for the first closest match
                                props.items.find((item) =>
                                    item.value
                                        .trim()
                                        .toLowerCase()
                                        .includes(
                                            inputValue.trim().toLowerCase()
                                        )
                                )!
                            );
                        }
                    } else if (e.key.length === 1) {
                        setInputValue(inputValue + e.key);
                        checkForErrors(inputValue + e.key);
                    } else if (e.key === "Backspace" || e.key === "Delete") {
                        const currentVal = inputValue.substring(
                            e.key === "Backspace" ? 0 : 1,
                            inputValue.length - 1
                        );
                        setInputValue(currentVal);
                        checkForErrors(currentVal);
                        if (props.state.value.value !== "") {
                            props.state.setState({ id: -1, value: "" });
                        }
                    }
                }}
            />
            <select
                ref={setSelectRef}
                defaultValue={props.state.value.value}
                name={props.name}
                className={selectClassName}
                id={props.name}
            >
                {/* Add empty first option that cannot be reselected */}
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
                    setOpen(!open);
                    stopBubbling(e);
                }}
            />
        </div>
    );
};

export default Select;
