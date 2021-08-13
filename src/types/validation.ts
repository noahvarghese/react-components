export interface ValidationProps {
    validator: (input: any) => { success: true; } | { success: false; errorMessage: string };
    runOnComplete: boolean;
    runOnInput: boolean;
}