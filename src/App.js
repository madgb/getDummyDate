import React, { Component } from "react";
import { getDummyUserData } from "./helper";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0,
            loading: false,
            href: "",
        };
    }
    handleValue = (e) => {
        this.setState({
            val: e.target.value,
        });
    };
    handleSaveToPC = (e) => {
        e.preventDefault();
        if (this.state.val > 10000) {
            const cf = window.confirm(
                "1만 건 이상은 오래 걸립니다. 괜찮을까요?"
            );
            if (!cf) {
                this.setState({ val: 10000 });
            }
        }
        this.setState({
            loading: true,
        });

        setTimeout(() => {
            this.processDownload();
        }, 3000);
    };
    processDownload = () => {
        const fileData = JSON.stringify(getDummyUserData(this.state.val));
        const blob = new Blob([fileData], { type: "json" });
        const url = URL.createObjectURL(blob);
        this.setState({
            href: url,
            loading: false,
        });
    };
    toggleAnchor = () => {
        this.setState({
            href: '',
        });
    };
    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSaveToPC}>
                    <input
                        type="number"
                        value={this.state.val}
                        onChange={this.handleValue}
                    />
                    <button type="submit">Create</button>
                </form>
                {!!this.state.href.length && (
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={this.state.href}
                        download={`${this.state.val} users data`}
                        onClick={this.toggleAnchor}
                    >
                        DOWNLOAD
                    </a>
                )}
                {this.state.loading ? (
                    <img
                        src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"
                        alt="loading"
                    />
                ) : null}
            </div>
        );
    }
}

export default App;
