import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

interface ProtectedRouteProps {
    component?:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
    exact?: boolean;
    path: string;
    redirectPath: string;
    condition: () => boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component,
    condition,
    exact,
    path,
    redirectPath,
    ...rest
}) => {
    if (condition()) {
        return (
            <Route {...rest} component={component} exact={exact} path={path} />
        );
    } else {
        return <Redirect to={redirectPath} />;
    }
};

export default ProtectedRoute;
