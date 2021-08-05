import React, { useState } from "react";
import "./Checkbox.scss";
var Checkbox = function (props) {
    var _a;
    var _b = useState(props.checked), checked = _b[0], setChecked = _b[1];
    return (React.createElement("div", { className: "checkbox" },
        React.createElement("input", { type: "checkbox", id: props.name, name: props.name, checked: checked, onChange: function () { return (!props.readonly ? setChecked(!checked) : null); }, readOnly: props.readonly }),
        React.createElement("label", { htmlFor: props.name }, (_a = props.label) !== null && _a !== void 0 ? _a : props.name)));
};
export default Checkbox;
