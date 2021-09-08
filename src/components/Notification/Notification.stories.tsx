import React, { useEffect } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Notification from ".";
import { useState } from "react";
import { State, Store } from "@sambego/storybook-state";
import { strictEqual } from "assert";

const store = new Store({ display: false });

const SimpleNotificationContainer = (props) => {
    useEffect(() => {
        setInterval(() => {
            store.set({ display: true });
        }, 3000);
    }, []);

    return (
        <div
            style={{
                width: "500px",
                height: "500px",
                backgroundColor: "#f3f3f3",
                position: "relative",
            }}
        >
            <State store={store}>
                <Notification
                    message="Hello"
                    display={store.get("display")}
                    hide={() => store.set({ display: false })}
                />
            </State>
        </div>
    );
};

export default {
    title: "Notification",
    component: SimpleNotificationContainer,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
    <SimpleNotificationContainer {...args} />
);

export const NotificationStory = Template.bind({});
