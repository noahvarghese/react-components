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
import Button from "./index";
export default {
    title: "Button",
    component: Button,
};
var Template = function (args) { return React.createElement(Button, __assign({}, args)); };
export var Primary = Template.bind({});
Primary.args = {
    primary: true,
    text: "Button",
};
export var Secondary = Template.bind({});
Secondary.args = {
    primary: false,
    text: "Button",
};
export var Large = Template.bind({});
Large.args = {
    size: "large",
    text: "Button",
};
export var Medium = Template.bind({});
Medium.args = {
    size: "medium",
    text: "Button",
};
export var Small = Template.bind({});
Small.args = {
    size: "small",
    text: "Button",
};
