import React, { useState } from "react";
import Input from ".";
import { act } from "react-dom/test-utils";
import {
    cleanup,
    fireEvent,
    getByText,
    render,
    screen,
} from "../../test/test-utils";
import userEvent from "@testing-library/user-event";

describe("email input", () => {
    const Wrapper = () => {
        const [state, setState] = useState("");
        const [error, setError] = useState("");

        return (
            <Input
                type="email"
                placeholder="email"
                required
                autoComplete="email"
                name="email"
                state={{
                    state,
                    setState,
                }}
                errorState={{ error, setError }}
            />
        );
    };

    let unmount: () => void;
    beforeEach(() => {
        act(() => {
            unmount = render(<Wrapper />).unmount;
        });
    });

    afterEach(() => {
        unmount();
        cleanup();
    });

    test("valid input", () => {
        const inputEl = screen.getByLabelText(/email/i);
        userEvent.type(inputEl, "test@test.com");
        expect(inputEl.classList).not.toContain("error");
    });

    test("empty email", () => {
        const inputEl = screen.getByLabelText(/email/i);
        userEvent.type(inputEl, "test@test.com");
        userEvent.clear(inputEl);
        expect(
            getByText(inputEl.parentElement, /email cannot be empty/i)
        ).toBeInTheDocument();
    });

    test("invalid email", async () => {
        const inputEl = screen.getByLabelText(/email/i);
        userEvent.type(inputEl, "test");
        expect(
            getByText(inputEl.parentElement, /invalid email/i)
        ).toBeInTheDocument();
    });
});

describe("phone input", () => {
    const Wrapper = () => {
        const [state, setState] = useState("");
        const [error, setError] = useState("");

        return (
            <Input
                type="tel"
                placeholder="phone"
                required
                autoComplete="tel"
                name="phone"
                state={{
                    state,
                    setState,
                }}
                errorState={{ error, setError }}
            />
        );
    };

    let unmount: () => void;
    beforeEach(() => {
        act(() => {
            unmount = render(<Wrapper />).unmount;
        });
    });

    afterEach(() => {
        unmount();
        cleanup();
    });

    test("valid phone", () => {
        const inputEl = screen.getByLabelText(/phone/i);
        userEvent.type(inputEl, "9053393294");
        expect(inputEl.classList).not.toContain("error");
    });

    test("empty phone", () => {
        const inputEl = screen.getByLabelText(/phone/i);
        userEvent.type(inputEl, "9053393294");
        userEvent.clear(inputEl);
        expect(
            getByText(inputEl.parentElement, /phone number cannot be empty/i)
        ).toBeInTheDocument();
    });

    test("invalid phone", async () => {
        const inputEl = screen.getByLabelText(/phone/i);
        userEvent.type(inputEl, "test");
        expect(
            getByText(inputEl.parentElement, /invalid phone number/i)
        ).toBeInTheDocument();
    });
});

describe("postal code input", () => {
    const Wrapper = () => {
        const [state, setState] = useState("");
        const [error, setError] = useState("");

        return (
            <Input
                type="text"
                placeholder="postal code"
                required
                autoComplete="postal-code"
                name="postal_code"
                state={{
                    state,
                    setState,
                }}
                errorState={{ error, setError }}
            />
        );
    };

    let unmount: () => void;
    beforeEach(() => {
        act(() => {
            unmount = render(<Wrapper />).unmount;
        });
    });

    afterEach(() => {
        unmount();
        cleanup();
    });

    test("valid postal code", () => {
        const inputEl = screen.getByLabelText(/postal code/i);
        userEvent.type(inputEl, "L6L 1Z3");
        expect(inputEl.classList).not.toContain("error");
    });

    test("empty postal code", () => {
        const inputEl = screen.getByLabelText(/postal code/i);
        userEvent.type(inputEl, "L6L 1Z3");
        userEvent.clear(inputEl);
        expect(
            getByText(inputEl.parentElement, /postal code cannot be empty/i)
        ).toBeInTheDocument();
    });

    test("invalid postal code", async () => {
        const inputEl = screen.getByLabelText(/postal code/i);
        userEvent.type(inputEl, "test");
        expect(
            getByText(inputEl.parentElement, /invalid postal code/i)
        ).toBeInTheDocument();
    });
});

describe("custom validator", () => {
    const Wrapper = () => {
        const [state, setState] = useState("");
        const [error, setError] = useState("");

        return (
            <Input
                type="password"
                placeholder="password"
                required
                autoComplete="new-password"
                name="password"
                state={{
                    state,
                    setState,
                }}
                errorState={{ error, setError }}
                validationOptions={{
                    runOnComplete: true,
                    runOnInput: true,
                    validatorFn: (val: string, field: string = "password") => {
                        if (val.length < 8) {
                            return {
                                success: false,
                                errorMessage:
                                    "Password must be at least 8 characters",
                            };
                        } else {
                            return {
                                success: true,
                            };
                        }
                    },
                }}
            />
        );
    };

    let unmount: () => void;
    beforeEach(() => {
        act(() => {
            unmount = render(<Wrapper />).unmount;
        });
    });

    afterEach(() => {
        unmount();
        cleanup();
    });

    test("custom validator gives error", () => {
        const inputEl = screen.getByLabelText(/password/i);
        userEvent.type(inputEl, "test");

        expect(
            getByText(
                inputEl.parentElement,
                "Password must be at least 8 characters"
            )
        ).toBeInTheDocument();
    });

    test("custome validator passes", () => {
        const inputEl = screen.getByLabelText(/password/i);
        userEvent.type(inputEl, "password");

        expect(inputEl.classList).not.toContain("error");
    });
});

describe("date input", () => {
    const Wrapper = () => {
        const [state, setState] = useState("");
        const [error, setError] = useState("");

        return (
            <Input
                type="date"
                placeholder="birthday"
                required
                autoComplete="bday"
                name="birthday"
                state={{
                    state,
                    setState,
                }}
                errorState={{ error, setError }}
            />
        );
    };

    let unmount: () => void;
    beforeEach(() => {
        act(() => {
            unmount = render(<Wrapper />).unmount;
        });
    });

    afterEach(() => {
        unmount();
        cleanup();
    });

    test("valid date", () => {
        const inputEl = screen.getByLabelText(/birthday/i);
        const date = new Date(2020, 10, 11);
        userEvent.type(
            inputEl,
            `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
        );
        expect(inputEl.classList).not.toContain("error");
    });

    test("empty date", () => {
        const inputEl = screen.getByLabelText(/birthday/i);
        const date = new Date(2020, 10, 11);
        act(() => {
            fireEvent.input(
                inputEl,
                `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            );
        });
        act(() => {
            fireEvent.input(inputEl, "");
        });

        expect(
            getByText(inputEl.parentElement, /birthday cannot be empty/i)
        ).toBeInTheDocument();
    });
});
