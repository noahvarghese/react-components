import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav, { NavProps } from "../Nav";
import "./index.scss";

export interface AppRouterProps {
    navProps: NavProps;
    Footer: ReactNode;
}

const AppRouter: React.FC<AppRouterProps> = ({ Footer, ...props }) => {
    return (
        <div className="App app-container">
            <Router>
                <Nav {...props.navProps} />
                {/* The routes should be passed in the children */}
                <div className="content-container">{props.children}</div>
                {Footer}
            </Router>
        </div>
    );
};

export default AppRouter;
