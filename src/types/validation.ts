export interface ValidationProps {
    validator: (
        input: any,
        validOptions?: { id: number; value: any }[]
    ) => { success: true } | { success: false; errorMessage: string };
    runOnComplete: boolean;
    runOnInput: boolean;
}
