var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import Checkbox from ".";
export default {
    title: "Checkbox",
    component: Checkbox,
};
var Template = function (args) { return (React.createElement(Checkbox, __assign({}, args))); };
export var Checked = Template.bind({});
Checked.args = {
    checked: true,
    label: "Checkbox",
    name: "Checkbox",
};
export var Unchecked = Template.bind({});
Unchecked.args = {
    label: "Checkbox",
    name: "Checkbox",
};
export var ReadOnlyChecked = Template.bind({});
ReadOnlyChecked.args = {
    readonly: true,
    checked: true,
    label: "Checkbox",
    name: "Checkbox",
};
export var ReadOnlyUnchecked = Template.bind({});
ReadOnlyUnchecked.args = {
    readonly: true,
    checked: false,
    label: "Checkbox",
    name: "Checkbox",
};
