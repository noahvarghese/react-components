import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../Button";
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
    const location = useLocation();
    const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [ulRef, setUlRef] = useState<HTMLUListElement | null>(null);
    const [displayMobile, setDisplayMobile] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    const running = useRef(false);
    const maxListWidth = useRef(0);

    const checkMobile = useCallback(() => {
        if (!running.current) {
            if (imgRef && ulRef) {
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

    useEffect(() => {
        if (imgRef && ulRef) {
            checkMobile();
        }
    }, [imgRef, ulRef, checkMobile]);

    return (
        <div
            className={
                (displayMobile ? "nav--small" : "nav--large") +
                " Nav nav-container"
            }
        >
            {props.displayBanner &&
                props.displayBanner() &&
                props.bannerMessage && (
                    <div className="nav-banner">{props.bannerMessage}</div>
                )}
            <nav>
                {displayMobile && (
                    <HamburgerToggle
                        showMenu={showMenu}
                        toggleMenu={() => setShowMenu(!showMenu)}
                    />
                )}
                <Link to="/" className="nav-logo-container">
                    <img
                        ref={setImgRef}
                        src={props.logo}
                        alt="Company Logo"
                        className="nav-logo"
                    />
                </Link>
                <ul
                    ref={setUlRef}
                    className={
                        displayMobile && showMenu
                            ? "mobile-nav-visible"
                            : displayMobile && !showMenu
                            ? "mobile-nav-hidden"
                            : ""
                    }
                >
                    {props.items.map(({ name, path }) => (
                        <li
                            key={name}
                            className={
                                path === location.pathname ? "nav--active" : ""
                            }
                        >
                            <Link to={path}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {props.displayCallToAction &&
                props.displayCallToAction() &&
                props.callToAction && (
                    <div className="sub-nav">
                        <Button
                            link={props.callToAction.path}
                            text={props.callToAction.text}
                            size="small"
                            primary
                        />
                    </div>
                )}
        </div>
    );
};

export default Nav;
