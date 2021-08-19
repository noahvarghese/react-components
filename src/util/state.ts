export const changeState = <T extends keyof X, X>(
    name: keyof X,
    value: T,
    previousState: X,
    setState: (prevState: X) => void
): void => {
    const newState = Object.assign({}, previousState, { [name]: value });
    setState(newState);
};
