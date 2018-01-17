import React from 'react';
import { observer } from 'mobx-react';
import store from '../../Store';

import './index.scss';

interface AppProps {}

interface AppState {
    file: File | null;
}

@observer
class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.fileUpload(this.state.file).then(response => {
            console.log(response);
        });
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
        reader.onload = e => {
            // return fetch('/api/submitFile', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         values: reader.result
            //     })
            // });
            store.calculate(reader.result);
        };
        reader.readAsText(file);
    }

    render() {
        return (
            <div id="app">
                <div id="instructions">
                    <h2>
                        This application calculates increasing and decreasing
                        subranges.
                    </h2>

                    <div>
                        The algorithm accepts <code>N</code> integers and a
                        fixed window size of <code>K</code>. For each window of{' '}
                        <code>K</code> integers, the application finds the
                        number of increasing subranges within the window minus
                        the number of decreasing subranges within the window.
                    </div>

                    <div>
                        A window of integers is defined as a continuous range of
                        integers. Thus, there are exactly <code>N - K + 1</code>{' '}
                        windows where this metric is computed. An increasing
                        subrange is defined as a a contiguous range of indices{' '}
                        <code>[a, b], a {`<`} b</code>, where each element is
                        larger than the codevious element. A decreasing subrange
                        is similarly defined, except each element is smaller
                        than the codevious element.
                    </div>

                    <div>
                        The file selector accepts a .txt input file where Line 1
                        contains two integers, <code>N</code> and <code>K</code>,
                        and line 2 contains <code>N</code> positive integers,
                        each less than <code>1,000,000</code>.
                    </div>
                    <div>
                        The output of the application represents the number of
                        increasing and decreasing subranges per window, where{' '}
                        <code>1</code> is added to the result for every
                        increasing subrange and <code>1</code> is subtracted
                        from the result for every decreasing subrange.
                    </div>
                    <div>An example valid input of:</div>

                    <div>
                        <pre className="example-block">
                            <div>5 3</div>
                            <div>188930 194123 201345 154243 154243</div>
                        </pre>
                    </div>

                    <div>Will return an output of:</div>

                    <pre className="example-block">
                        <div> 3</div>
                        <div> 0</div>
                        <div>-1</div>
                    </pre>
                </div>
                <div>
                    because in the first window there are three increasing
                    subranges (<code>3</code>), in the second window there is
                    one increasing subrange and one decreasing subrange (<code>
                        0
                    </code>), and in the last window there are zero increasing
                    subranges and one decreasing subrange (<code>-1</code>).
                </div>
                <div>
                    <form
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={e => this.onFormSubmit(e)}>
                        <div>
                            <label htmlFor="file">
                                Choose a .txt file to upload.
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                accept=".txt"
                                onChange={e => this.onChange(e.target.files)}
                            />
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
                <div>Result:</div>
                {store.output.map((int: Number) => <div>{int}</div>)}
            </div>
        );
    }
}

export default App;
