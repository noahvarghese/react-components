import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import HamburgerToggle from "../HamburgerToggle";
// import { useMediaQuery } from "react-responsive";
// import { Link } from "react-router-dom";
import "./index.scss";

export interface NavProps {
    items: { name: string; path: string }[];
    type: "card";
    callToAction: { text: string; path: string };
    displayCallToAction?: () => boolean;
    bannerMessage: ReactNode | string;
    displayBanner?: () => boolean;
    logo: string;
}

const Nav: React.FC<NavProps> = (props) => {
    const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [ulRef, setUlRef] = useState<HTMLUListElement | null>(null);
    const [displayMobile, setDisplayMobile] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    useEffect(() => {
        if (imgRef && ulRef) {
            checkMobile();
        }
    }, [imgRef, ulRef]);

    const running = useRef(false);
    const maxListWidth = useRef(0);

    const checkMobile = useCallback(() => {
        if (!running.current) {
            if (imgRef && ulRef) {
                console.log(ulRef.clientWidth);
                running.current = true;
                // 1rem = 16px
                const minGaps = 6 * 16;

                if (ulRef.clientWidth > maxListWidth.current) {
                    maxListWidth.current = ulRef.clientWidth;
                    running.current = false;
                    return;
                }

                const navLargerThanWindow =
                    window.innerWidth <
                    maxListWidth.current + imgRef.clientWidth + minGaps;

                if (!displayMobile && navLargerThanWindow) {
                    setDisplayMobile(true);
                    setShowMenu(false);
                } else if (displayMobile && !navLargerThanWindow) {
                    setDisplayMobile(false);
                    setShowMenu(false);
                }
                running.current = false;
            }
        }
    }, [imgRef, ulRef, displayMobile, setDisplayMobile, running]);

    return (
        <nav
            className={
                (displayMobile ? "nav--small" : "nav--large") +
                " Nav nav-container"
            }
        >
            {displayMobile && (
                <HamburgerToggle
                    showMenu={showMenu}
                    toggleMenu={() => setShowMenu(!showMenu)}
                />
            )}
            <div className="nav-logo-container">
                <img
                    ref={setImgRef}
                    src={props.logo}
                    alt="Company Logo"
                    className="nav-logo"
                />
            </div>
            <ul ref={setUlRef}>
                {props.items.map(({ name, path }) => (
                    <li key={name}>
                        <Link to={path}>{name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
