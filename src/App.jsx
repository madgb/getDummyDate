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
            hrefs: [],
            multiDown: false,
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
        const data = getDummyUserData(this.state.val);
        console.timeLog("MyTimer", "get ready to assign object to JSON");
        const timerDiv = document.getElementById('timer');

        if (data.length > 50000) {
            const oneFourth = Math.floor(data.length / 4);
            const twoFourth = Math.floor((data.length * 2) / 4);
            const threeFourth = Math.floor((data.length * 3) / 4);

            const firstData = data.slice(0, oneFourth);
            const secondData = data.slice(oneFourth, twoFourth);
            const thirdData = data.slice(twoFourth, threeFourth);
            const fourthData = data.slice(threeFourth);

            console.timeLog("MyTimer", "slicing files done");
            const timerSliceDone = new Date();
            const sliceAbstract = (timerSliceDone - window.timerStart);
            const timerSliceDoneNode = document.createElement("p");
            timerSliceDoneNode.textContent = `Slice data into pieces done in ${sliceAbstract}ms`;
            timerDiv.appendChild(timerSliceDoneNode);

            const fileDataOne = JSON.stringify(firstData);
            const fileDataTwo = JSON.stringify(secondData);
            const fileDataThree = JSON.stringify(thirdData);
            const fileDataFour = JSON.stringify(fourthData);

            console.timeLog("MyTimer", "stringify done");
            const timerStringifyDone = new Date();
            const stringifyAbstract = (timerStringifyDone - window.timerStart);
            const timerStringifyDoneNode = document.createElement("p");
            timerStringifyDoneNode.textContent = `Stringify data done in ${stringifyAbstract}ms`;
            timerDiv.appendChild(timerStringifyDoneNode);

            const blobOne = new Blob([fileDataOne], { type: "octet/stream" });
            const blobTwo = new Blob([fileDataTwo], { type: "octet/stream" });
            const blobThree = new Blob([fileDataThree], {
                type: "octet/stream",
            });
            const blobFour = new Blob([fileDataFour], {
                type: "octet/stream",
            });

            console.timeLog("MyTimer", "transition to BLOB done");
            const timerBLOBDone = new Date();
            const BLOBabstract = (timerBLOBDone - window.timerStart);
            const timerBLOBDoneNode = document.createElement("p");
            timerBLOBDoneNode.textContent = `Stringify data done in ${BLOBabstract}ms`;
            timerDiv.appendChild(timerBLOBDoneNode);

            const urlOne = URL.createObjectURL(blobOne);
            const urlTwo = URL.createObjectURL(blobTwo);
            const urlThree = URL.createObjectURL(blobThree);
            const urlFour = URL.createObjectURL(blobFour);

            this.setState({
                hrefs: [urlOne, urlTwo, urlThree, urlFour],
                loading: false,
                multiDown: true,
            });

            console.timeLog("MyTimer", "setState done");
            const timerSetstateDone = new Date();
            const steStateAbstract = (timerSetstateDone - window.timerStart);
            const timerSetstateDoneNode = document.createElement("p");
            timerSetstateDoneNode.textContent = `Set data to state done in ${steStateAbstract}ms`;
            timerDiv.appendChild(timerSetstateDoneNode);
        } else {
            const fileData = JSON.stringify(getDummyUserData(this.state.val));

            console.timeLog("MyTimer", "stringify done");

            const blob = new Blob([fileData], { type: "octet/stream" });

            console.timeLog("MyTimer", "transition to BLOB done");

            const url = URL.createObjectURL(blob);
            this.setState({
                href: url,
                loading: false,
            });
            console.timeLog("MyTimer", "setState done");
        }
        console.timeEnd("MyTimer");
        const timerDone = new Date();
        const doneAbstract = (timerDone - window.timerStart);
        const timerDoneNode = document.createElement("p");
        timerDoneNode.textContent = `JS work done in ${doneAbstract}ms, downloads will be avaliable soon...`;
        timerDiv.appendChild(timerDoneNode);
    };
    toggleAnchor = () => {
        this.setState({
            href: "",
        });
    };
    render() {
        return (
            <div className="App">
                <div id="timer">
                </div>
                <form onSubmit={this.handleSaveToPC}>
                    <input
                        type="number"
                        value={this.state.val}
                        onChange={this.handleValue}
                    />
                    <button type="submit">Create</button>
                </form>
                {!!this.state.href.length && !this.state.multiDown ? (
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={this.state.href}
                        download={`${this.state.val} users data.json`}
                        onClick={this.toggleAnchor}
                    >
                        DOWNLOAD
                    </a>
                ) : (
                    this.state.hrefs.map((url, idx) => (
                        <a
                            key={idx}
                            rel="noopener noreferrer"
                            target="_blank"
                            href={url}
                            download={`${this.state.val} users data ${
                                idx + 1
                            }.json`}
                            onClick={this.toggleAnchor}
                        >
                            DOWNLOAD {idx + 1}
                        </a>
                    ))
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
