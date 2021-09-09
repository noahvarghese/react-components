import React, { SetStateAction } from "react";

export interface ErrorProps {
    error: string | undefined;
    setError: (
        val?: string | undefined
    ) => void | React.Dispatch<SetStateAction<string>>;
}
