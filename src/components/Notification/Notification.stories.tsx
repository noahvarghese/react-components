import React, { useEffect } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Notification from ".";
import { State, Store } from "@sambego/storybook-state";

const store = new Store({ display: false });

const SimpleNotificationContainer = (props) => {
    useEffect(() => {
        setInterval(() => {
            store.set({ display: true });
        }, 4000);
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
                    error={props.error}
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
NotificationStory.args = {};

export const ErrorNotificationStory = Template.bind({});
ErrorNotificationStory.args = { error: true };
