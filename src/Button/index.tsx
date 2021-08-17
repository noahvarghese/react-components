import React, { MouseEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";

export interface ButtonProps {
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
const Button: React.FC<ButtonProps> = ({
    primary = false,
    size = "small",
    type = "button",
    ...props
}) => {
    const location = useHistory();
    const mode = primary ? "button--primary" : "button--secondary";
    const className = [
        "Button",
        "button-container",
        `button--${size}`,
        mode,
    ].join(" ");

    if (props.link) {
        if (props.link !== location.location.pathname) {
            return (
                <Link
                    onClick={props.onClick}
                    to={props.link}
                    className={className}
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
                className={className}
                disabled={props.disabled}
                type={type}
            >
                {props.text}
            </button>
        );
    }
};

export default Button;
