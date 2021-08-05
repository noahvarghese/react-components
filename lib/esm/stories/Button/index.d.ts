import React, { MouseEvent } from "react";
import "./Button.scss";
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
declare const Button: React.FC<ButtonProps>;
export default Button;
