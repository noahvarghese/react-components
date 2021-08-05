import React from "react";
import "./FileInput.scss";
export interface FileInputProps {
    multipleFiles?: boolean;
    name: string;
    label?: string;
    accept?: string;
}
declare const FileInput: React.FC<FileInputProps>;
export default FileInput;
