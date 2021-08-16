export interface StateProps<T> {
    value: T;
    setState: (val: T) => void;
}
