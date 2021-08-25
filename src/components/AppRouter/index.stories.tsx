import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import AppRouter from ".";

import Logo from "../../assets/img/logo.png";
import { Route } from "react-router-dom";

export default {
    title: "AppRouter",
    component: AppRouter,
} as ComponentMeta<typeof AppRouter>;

const Template: ComponentStory<typeof AppRouter> = (args) => (
    <AppRouter {...args} />
);

export const Router = Template.bind({});

Router.args = {
    navProps: {
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
    },
    routes: [
        {
            path: "*",
            component: () => (
                <>
                    <h1>Hello</h1>
                    <p>My name is Noah Varghese</p>
                </>
            ),
        },
    ],
    Footer: (
        <footer className="Footer footer-container">
            &#169; Noah Varghese 2021
        </footer>
    ),
};
