import React from 'react';

import './index.scss';

interface AppProps {};

// interface HTMLInputEvent extends Event {
//     target: HTMLInputElement & EventTarget;
// }

interface AppState {
    file: File | null
}

class App extends React.Component<AppProps, AppState> {
    
    constructor(props: AppProps) {
        super(props);
        this.state = {
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.fileUpload(this.state.file).then((response) => {
            console.log(response);
        })
    }

    onChange(fileList: FileList | null) {
        if (fileList !== null) {
            this.setState({ file: fileList[0] }, () => {
                return;
            });
        }
        return;
    }

    async fileUpload(file: File) {
        const formData = new FormData();
        const reader = new FileReader();
        reader.onload = (e) => {
            return fetch('/api/submitFile', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    values: reader.result
                })
            });
        }
        reader.readAsText(file);
    }

    render() {
        return (
            <div id="app">
                <div id="instructions">
                    <div>This application calculates increasing and decreasing subranges.</div>

                    <div>The algorithm accepts N integers and a fixed window size of K. For each window of K integers, the application finds the number of increasing subranges within the window minus the number of decreasing subranges within the window.</div>

                    <div>A window of integers is defined as a continuous range of integers. Thus, there are exactly N - K + 1 windows where this metric is computed. An increasing subrange is defined as a a contiguous range of indices [a, b], a ${`<`} b, where each element is larger than the previous element. A decreasing subrange is similarly defined, except each element is smaller than the previous element.</div>

                    <div>The file selector accepts a .txt input file where Line 1 contains two integers, N and K, and line 2 contains N positive integers, each less than 1,000,000.</div>
                    
                    <div>An example valid input of:</div>

                    <div>
                        <div>5 3</div>
                        <div>188930 194123 201345 154243 154243</div>
                    </div>

                    <div>Will return an output of:</div>

                    <div>
                        3
                        0
                        -1
                    </div>
                </div>
                <div>
                    <form method="post" encType="multipart/form-data" onSubmit={(e) => this.onFormSubmit(e)}>
                        <div>
                            <label htmlFor="file">Choose a .txt file to upload.</label>
                            <input type="file" id="file" name="file" accept=".txt" onChange={(e) => this.onChange(e.target.files)} />
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;