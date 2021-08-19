import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    const [liRefs, setLiRefs] = useState<(HTMLLIElement | null)[]>(
        props.items.map(() => null)
    );
    const [displayMobile, setDisplayMobile] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    useEffect(() => {
        if (imgRef && liRefsNotNull()) {
            checkMobile();
        }
    }, [imgRef, liRefs]);

    const liRefsNotNull = useCallback(() => {
        liRefs
            .map((ref) => ref !== null)
            .reduce((prevVal, currVal, currIndex) => {
                if (currIndex === 0) {
                    return true && currVal;
                } else {
                    return prevVal && currVal;
                }
            });
    }, [liRefs]);

    const checkMobile = useCallback(() => {
        if (imgRef && liRefsNotNull) {
            // 1rem = 16px
            const minGaps = 6 * 16;
            const listWidth = (liRefs as HTMLLIElement[])
                .map((ref) => {
                    return ref.clientWidth;
                })
                .reduce((prevVal, currVal) => {
                    return prevVal + currVal;
                });

            const navLargerThanWindow = window.innerWidth < listWidth + minGaps;
            if (!displayMobile && navLargerThanWindow) {
                setDisplayMobile(true);
            } else if (displayMobile && !navLargerThanWindow) {
                setDisplayMobile(false);
            }
        }
    }, [imgRef, liRefs]);

    return (
        <nav
            className={
                "Nav nav-container " + displayMobile
                    ? "nav--small"
                    : "nav--large"
            }
        >
            <div className="nav-logo-container">
                <img
                    ref={setImgRef}
                    src={props.logo}
                    alt="Company Logo"
                    className="nav-logo"
                />
            </div>
            <ul>
                {props.items.map(({ name, path }, index) => (
                    <li
                        ref={(ref: HTMLLIElement) => {
                            // This may require makuing a copy before modification
                            liRefs[index] = ref;
                            setLiRefs(liRefs);
                        }}
                        key={name}
                    >
                        <Link to={path}>name</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
