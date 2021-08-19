import React, { useState } from "react";
import "./index.scss";

export interface HamburgerToggleProps {
    showMenu: boolean;
    toggleMenu?: () => void;
}

const HamburgerToggle: React.FC<HamburgerToggleProps> = (props) => {
    const [showMenu, setShowMenu] = useState(props.showMenu);

    return (
        <button
            className={
                (showMenu ? "open" : "") +
                " HamburgerToggle hamburger-toggle-container"
            }
            onClick={() => {
                if (props.toggleMenu) {
                    props.toggleMenu();
                }
                setShowMenu(!showMenu);
            }}
        >
            <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
        </button>
    );
};

export default HamburgerToggle;
