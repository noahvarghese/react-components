import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";

function render(
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    renderOptions?: any,
    history?: any
) {
    function Wrapper({
        children,
    }: {
        children: React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
        >;
    }) {
        return history ? (
            <Router history={history}>{children}</Router>
        ) : (
            <BrowserRouter>{children}</BrowserRouter>
        );
    }

    return rtlRender(ui, {
        wrapper: Wrapper as React.ComponentType,
        ...renderOptions,
    });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
