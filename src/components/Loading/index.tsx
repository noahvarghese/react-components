import React from "react";
import "./index.scss";

class Loading extends React.Component<{}, { ellipses: string }> {
    private interval?: NodeJS.Timeout;

    constructor(props: any) {
        super(props);
        this.state = {
            ellipses: "",
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.ellipses.length < 3) {
                this.setState({
                    ellipses: `${this.state.ellipses}.`,
                });
            } else {
                this.setState({ ellipses: "" });
            }
        }, 700);
    }

    componentWillUnmount() {
        if (this.interval) clearInterval(this.interval);
    }

    render() {
        return (
            <div className="Loading">
                <h1>Loading{this.state.ellipses}</h1>
            </div>
        );
    }
}

export default Loading;
