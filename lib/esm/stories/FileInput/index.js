import React, { useState, useCallback } from "react";
import File from "../assets/img/file.png";
import "./FileInput.scss";
var FileInput = function (props) {
    var _a;
    var _b = useState([]), files = _b[0], setFiles = _b[1];
    var _c = useState(false), dragged = _c[0], setDrag = _c[1];
    var _d = useState(null), inputRef = _d[0], setInputRef = _d[1];
    var filesDropped = useCallback(function (e) {
        if (inputRef !== null) {
            if (e.dataTransfer) {
                var newFiles = Array.from(e.dataTransfer.files).map(function (file) { return file.name; });
                setFiles(newFiles);
                inputRef.files = e.dataTransfer.files;
            }
        }
        e.preventDefault();
    }, [setFiles, inputRef]);
    var filesAdded = useCallback(function (e) {
        var files = e.currentTarget.files;
        var newFiles = [];
        if (!files) {
            setFiles([]);
            return;
        }
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            newFiles.push(file.name);
        }
        setFiles(newFiles);
        e.preventDefault();
    }, [setFiles]);
    return (React.createElement("div", { className: "file-input" },
        React.createElement("label", { htmlFor: props.name, className: dragged ? "drag" : "", onDragOver: function (e) {
                e.preventDefault();
                e.stopPropagation();
                setDrag(true);
            }, onDragLeave: function (e) {
                e.preventDefault();
                e.stopPropagation();
                setDrag(false);
            }, onDrop: function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = "copy";
                filesDropped(e);
                setDrag(false);
            } },
            React.createElement("div", { className: "img-container" },
                React.createElement("img", { src: File, alt: "file" })),
            React.createElement("div", null, (_a = props.label) !== null && _a !== void 0 ? _a : "Drag and drop files, or click to select"),
            files.length > 0 && React.createElement("p", null,
                "Files added: ",
                files.join(", ")),
            React.createElement("input", { ref: setInputRef, type: "file", name: props.name, id: props.name, multiple: props.multipleFiles, accept: props.accept, onChange: function (e) { return filesAdded(e); } }))));
};
export default FileInput;
