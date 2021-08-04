import React, { MouseEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Button.scss";

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    text: string;
    disabled?: boolean;
    link?: string;
    onClick?: (e: MouseEvent<unknown, unknown>) => void;
    size?: "small" | "medium" | "large";
    type?: "button" | "reset" | "submit";
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
    primary = false,
    size = "small",
    type = "button",
    ...props
}) => {
    const location = useHistory();
    const mode = primary ? "button--primary" : "button--secondary";

    if (props.link) {
        if (props.link !== location.location.pathname) {
            return (
                <Link
                    onClick={props.onClick}
                    to={props.link}
                    className={["button", `button--${size}`, mode].join(" ")}
                >
                    {props.text}
                </Link>
            );
        } else {
            return null;
        }
    } else {
        return (
            <button
                onClick={props.onClick}
                className={["button", `button--${size}`, mode].join(" ")}
                disabled={props.disabled}
                type={type}
            >
                {props.text}
            </button>
        );
    }
};
