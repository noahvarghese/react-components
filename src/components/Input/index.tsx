import React, { useCallback } from "react";
import { ErrorProps } from "../../types/error";
import { StateProps } from "../../types/state";
import { ValidationProps } from "../../types/validation";
import validator from "validator";
import { PhoneNumber, PhoneNumberUtil } from "google-libphonenumber";
import "./index.scss";

// Need to add in datalist capabilities
// Need to keep label span on top when there is an error and content and focus is off the element

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    required: boolean;
    readonly?: boolean;
    state: StateProps<string>;
    validationOptions?: ValidationProps;
    errorState?: ErrorProps;
    formatter?: (input: any) => any;
    autoComplete?: string;
}

type InputValidatorFunction = (
    val: string,
    field: string
) => { success: true } | { success: false; errorMessage: string };

interface InputValidators {
    [name: string]: InputValidatorFunction;
}

const validators: InputValidators = {
    required: (val: string, field: string) => {
        if (validator.isEmpty(val)) {
            return {
                success: false,
                errorMessage: `${field.split("_").join(" ")} cannot be empty`,
            };
        } else {
            return {
                success: true,
            };
        }
    },
    date: (val: string, field: string) => {
        const res = validators.required(val, field);

        if (!res.success) {
            return res;
        }

        try {
            Date.parse(val);
            return { success: true };
        } catch (_) {
            return { success: false, errorMessage: `Invalid ${field}` };
        }
    },
    email: (val: string) => {
        const res = validators.required(val, "email");

        if (!res.success) {
            return res;
        }

        if (validator.isEmail(val)) {
            return res;
        } else {
            return {
                success: false,
                errorMessage: "Invalid email",
            };
        }
    },
    tel: (val: string) => {
        const res = validators.required(val, "phone number");

        if (!res.success) {
            return res;
        }

        let phoneUtil = new PhoneNumberUtil();
        let phone: string | PhoneNumber = val;

        try {
            // currently locale is hard coded
            phone = phoneUtil.parseAndKeepRawInput(phone, "CA");
            if (phoneUtil.isValidNumber(phone)) {
                return res;
            }
        } catch (e) {}

        return {
            success: false,
            errorMessage: "Invalid phone number",
        };
    },
    postal_code: (val: string) => {
        const res = validators.required(val, "postal code");

        if (!res.success) {
            return res;
        }

        if (
            !/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
                val
            )
        ) {
            return {
                success: false,
                errorMessage: "Invalid postal code",
            };
        }
        // validator does not work nicely with canadian postal codes
        // if (validator.isPostalCode(val, "any")) {
        // res.success = false;
        // res.errorMessage = "Invalid postal code";
        // }

        return res;
    },
};

const Input: React.FC<InputProps> = (props) => {
    let chosenValidator: InputValidatorFunction | undefined = undefined;

    const validatorKeys = Object.keys(validators);

    if (validatorKeys.includes(props.type)) {
        chosenValidator = validators[props.type];
    } else if (
        props.autoComplete &&
        validatorKeys.includes(props.autoComplete.split("-").join("_"))
    ) {
        chosenValidator = validators[props.autoComplete.split("-").join("_")];
    } else if (props.required) {
        chosenValidator = validators.required;
    }

    const validate = useCallback(
        (input: any, run: boolean | undefined) => {
            const value = props.formatter ? props.formatter(input) : input;

            if (
                props.validationOptions &&
                props.errorState &&
                props.errorState.setError &&
                run &&
                chosenValidator
            ) {
                const res = chosenValidator(value, props.name);
                if (!res.success) {
                    props.errorState.setError(res.errorMessage);
                } else {
                    props.errorState.setError("");
                }
            }
            props.state.setState(value);
        },
        [chosenValidator, props]
    );

    return (
        <div
            className={
                (props.errorState && props.errorState.error ? "error " : "") +
                "Input input-container"
            }
        >
            <input
                autoComplete={props.autoComplete}
                type={props.type}
                readOnly={props.readonly}
                name={props.name}
                // this is hardcoded so the animation works
                required={true}
                id={props.name}
                onChange={(e) => {
                    validate(
                        e.currentTarget.value,
                        props.validationOptions?.runOnInput
                    );
                }}
                onInput={(e) => {
                    validate(
                        e.currentTarget.value,
                        props.validationOptions?.runOnInput
                    );
                }}
                onBlur={(e) => {
                    validate(
                        e.currentTarget.value,
                        props.validationOptions?.runOnComplete
                    );
                }}
                className={
                    (props.errorState && props.errorState.error
                        ? "error"
                        : "") + (props.state.state !== "" ? " has-input" : "")
                }
                value={props.state.state}
            />
            <label
                htmlFor={props.name}
                className={
                    props.errorState && props.errorState.error ? "error" : ""
                }
            >
                <span>{(props.required && "* ") + props.placeholder}</span>
            </label>
            {props.errorState && props.errorState.error && (
                <div className="error-message">
                    <p>{props.errorState.error}</p>
                </div>
            )}
        </div>
    );
};

export default Input;
