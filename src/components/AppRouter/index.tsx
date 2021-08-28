import React, { useCallback, useEffect, useState } from "react";
import {
    Route,
    RouteComponentProps,
    useLocation,
    useHistory,
} from "react-router-dom";
import Stack from "../../types/stack";
import Footer, { FooterProps } from "../Footer";
import Nav, { NavProps } from "../Nav";
import ProtectedRoute from "../ProtectedRoute";
import "./index.scss";

export interface AppRouterProps {
    navProps: NavProps;
    routes: {
        path: string;
        component?:
            | React.ComponentType<RouteComponentProps<any>>
            | React.ComponentType<any>;
        exact?: boolean;
        protectedProps?: {
            condition: () => boolean;
            redirectPath: string;
        };
    }[];
    footerProps: FooterProps;
}

// must be enclosed in BrowserRouter
const AppRouter: React.FC<AppRouterProps> = (props) => {
    // Keeps track of scroll position on each page
    const location = useLocation();
    const history = useHistory();

    const [backStack, setBackStack] = useState<
        Stack<{ location: unknown; top: number }>
    >(new Stack<{ location: unknown; top: number }>());

    const [frontStack, setFrontStack] = useState<
        Stack<{ location: unknown; top: number }>
    >(new Stack<{ location: unknown; top: number }>());

    const stacks = useCallback(
        (location, history) => {
            if (history.action === "PUSH") {
                backStack.push({ location, top: window.scrollY });
                setBackStack(backStack);
                if (frontStack.peek()) {
                    setFrontStack(
                        new Stack<{ location: unknown; top: number }>()
                    );
                }

                window.scrollTo({ top: 0 });
            } else if (history.action === "POP") {
                let back = backStack.peek();
                let front = frontStack.peek();

                if (
                    back &&
                    (back.location as any).key === history.location.key
                ) {
                    back = backStack.pop()!;
                    setBackStack(backStack);

                    frontStack.push(back);
                    setFrontStack(frontStack);

                    window.scrollTo({ top: back.top });
                } else if (
                    front &&
                    (front.location as any).key === history.location.key
                ) {
                    front = frontStack.pop()!;
                    setFrontStack(frontStack);

                    backStack.push(front);
                    setBackStack(backStack);
                    window.scrollTo({ top: front.top });
                }
            }
        },
        [frontStack, backStack]
    );

    useEffect(() => {
        // keep track of scroll position in stack that is in sync with browsing stack
        // if the user just went back 'pop' the last item out of the stack
        // and set -> window.scrollTo({top: stack.pop()})
        // if the user went forward set -> window.scrollTo({top: 0})
        stacks(location, history);
        // if new page
    }, [location, history, stacks]);

    return (
        <div className="App app-container">
            <Nav {...props.navProps} />
            <div className="content-container">
                {props.routes.map(
                    ({ path, component, exact, protectedProps }) =>
                        protectedProps ? (
                            <ProtectedRoute
                                component={component}
                                exact={exact}
                                path={path}
                                redirectPath={protectedProps.redirectPath}
                                condition={protectedProps.condition}
                                key={path}
                            />
                        ) : (
                            <Route
                                key={path}
                                exact={exact}
                                path={path}
                                component={component}
                            />
                        )
                )}
            </div>
            <Footer {...props.footerProps} />
        </div>
    );
};

export default AppRouter;
