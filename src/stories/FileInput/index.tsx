import React, { ChangeEvent, DragEvent, useState, useCallback } from "react";
import File from "../../assets/img/file.png";
import "./index.scss";

export interface FileInputProps {
    multipleFiles?: boolean;
    name: string;
    label?: string;
    accept?: string;
}

const FileInput: React.FC<FileInputProps> = (props) => {
    const [files, setFiles] = useState<string[]>([]);
    const [dragged, setDrag] = useState(false);
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    const filesDropped = useCallback(
        (e: DragEvent<HTMLLabelElement>) => {
            if (inputRef !== null) {
                if (e.dataTransfer) {
                    const newFiles = Array.from(e.dataTransfer.files).map(
                        (file) => file.name
                    );
                    setFiles(newFiles);

                    inputRef.files = e.dataTransfer.files;
                }
            }
            e.preventDefault();
        },
        [setFiles, inputRef]
    );

    const filesAdded = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const files = e.currentTarget.files;
            const newFiles: string[] = [];

            if (!files) {
                setFiles([]);
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                newFiles.push(file.name);
            }

            setFiles(newFiles);
            e.preventDefault();
        },
        [setFiles]
    );

    return (
        <div className="file-input">
            <label
                htmlFor={props.name}
                className={dragged ? "drag" : ""}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDrag(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDrag(false);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.dataTransfer.dropEffect = "copy";
                    filesDropped(e);
                    setDrag(false);
                }}
            >
                <div className="img-container">
                    <img src={File} alt="file" />
                </div>
                <div>
                    {props.label ?? "Drag and drop files, or click to select"}
                </div>
                {files.length > 0 && <p>Files added: {files.join(", ")}</p>}
                <input
                    ref={setInputRef}
                    type="file"
                    name={props.name}
                    id={props.name}
                    multiple={props.multipleFiles}
                    accept={props.accept}
                    onChange={(e) => filesAdded(e)}
                />
            </label>
        </div>
    );
};

export default FileInput;
