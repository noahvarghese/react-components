export interface ValidationProps {
    validatorFn?: (
        input: any,
        field: string
    ) => { success: true } | { success: false; errorMessage: string };
    runOnComplete: boolean;
    runOnInput: boolean;
}
