var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Button.scss";
/**
 * Primary UI component for user interaction
 */
var Button = function (_a) {
    var _b = _a.primary, primary = _b === void 0 ? false : _b, _c = _a.size, size = _c === void 0 ? "small" : _c, _d = _a.type, type = _d === void 0 ? "button" : _d, props = __rest(_a, ["primary", "size", "type"]);
    var location = useHistory();
    var mode = primary ? "button--primary" : "button--secondary";
    if (props.link) {
        if (props.link !== location.location.pathname) {
            return (React.createElement(Link, { onClick: props.onClick, to: props.link, className: ["button", "button--" + size, mode].join(" ") }, props.text));
        }
        else {
            return null;
        }
    }
    else {
        return (React.createElement("button", { onClick: props.onClick, className: ["button", "button--" + size, mode].join(" "), disabled: props.disabled, type: type }, props.text));
    }
};
export default Button;
