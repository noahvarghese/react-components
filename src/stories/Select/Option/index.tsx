import React from "react";
import { stopBubbling } from "../../../util/error";
import "./index.scss";

interface OptionListProps {
    inputValue: string;
    selected: { id: number; value: string };
    items: { id: number; value: string }[];
    visible: boolean;
    setSelected: (selected: { id: number; value: string }) => void;
}

const OptionList: React.FC<OptionListProps> = (props) => {
    let className = "OptionList option-list-container";

    if (props.visible) className += " show";

    return (
        <div className={className}>
            {props.items.map(({ id, value }) => {
                let optionClassName = "Option option-container";

                if (
                    props.selected.id === id &&
                    props.selected.value === value
                ) {
                    optionClassName += " selected";
                }

                if (
                    value
                        .trim()
                        .toLowerCase()
                        .includes(props.inputValue.trim().toLowerCase()) ||
                    props.inputValue === "" ||
                    props.selected.value !== ""
                )
                    optionClassName += " visible";

                return (
                    <div
                        className={optionClassName}
                        key={value}
                        onClick={(e) => {
                            stopBubbling(e);
                            props.setSelected({ id, value });
                        }}
                    >
                        {value}
                    </div>
                );
            })}
        </div>
    );
};

export default OptionList;
