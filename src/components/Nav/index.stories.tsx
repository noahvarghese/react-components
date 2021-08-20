import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Nav from ".";

import Logo from "../../assets/img/logo.png";
import { BrowserRouter as Router } from "react-router-dom";

export default {
    title: "Nav",
    decorators: [
        (Story) => (
            <Router>
                <Story />
            </Router>
        ),
    ],
    component: Nav,
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;

export const MainNav = Template.bind({});
MainNav.args = {
    items: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Testimonials", path: "/testimonials" },
        { name: "Gallery", path: "/gallery" },
        { name: "Contact", path: "/contact" },
        { name: "Blog", path: "/blog" },
    ],
    type: "card",
    callToAction: { text: "Request a quote", path: "/contact" },
    displayCallToAction: () => {
        return true;
    },
    bannerMessage: "More than 30 years of experience",
    displayBanner: () => true,
    logo: Logo,
};
