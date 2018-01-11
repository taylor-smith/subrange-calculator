import React from 'react';

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
        );
    }
}

export default App;