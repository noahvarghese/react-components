import React, { useEffect } from "react";
import "./Notification.scss";

interface NotificationProps {
    message: string;
    display: boolean;
    hide: () => void;
    error?: boolean;
}

const Notification: React.FC<NotificationProps> = (props) => {
    useEffect(() => {
        if (props.display) {
            setTimeout(() => {
                props.hide();
            }, 2000);
        }
    }, [props]);

    const classNames = [];

    if (props.display) classNames.push("show");
    if (props.error) classNames.push("error");

    return (
        <div className={classNames.join(" ") + " Notification"}>
            <p>{props.message}</p>
        </div>
    );
};

export default Notification;
