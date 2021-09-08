import React, { useEffect } from "react";
import "./Notification.scss";

interface NotificationProps {
    message: string;
    display: boolean;
    hide: () => void;
}

const Notification: React.FC<NotificationProps> = (props) => {
    useEffect(() => {
        if (props.display) {
            setTimeout(() => {
                props.hide();
            }, 2000);
        }
    }, [props]);
    return (
        <div className={(props.display ? "show " : "") + "Notification"}>
            <p>{props.message}</p>
        </div>
    );
};

export default Notification;
