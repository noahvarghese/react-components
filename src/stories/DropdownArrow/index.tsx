import React, { MouseEvent, useEffect, useState } from "react";
import "./index.scss";

interface DropdownArrowProps {
    show?: boolean;
    onClick?: (e: MouseEvent<unknown, unknown>) => void;
}
const DropdownArrow: React.FC<DropdownArrowProps> = (props) => {
    const [display, setDisplay] = useState(props.show);

    useEffect(() => {
        setDisplay(props.show);
    }, [props.show]);

    const onClick = (e: MouseEvent<unknown, unknown>) => {
        // prevent side effects and double event handlers
        e.preventDefault();
        e.stopPropagation();
        setDisplay(!display);
        if (props.onClick) props.onClick(e);
    };

    return (
        <div
            className={`${display ? "show " : ""}DropdownArrow`}
            onClick={onClick}
        >
            <button onClick={onClick}>
                <div
                    className="first"
                ></div>
                <div
                    className="second"
                ></div>
            </button>
        </div>
    );
};

export default DropdownArrow;