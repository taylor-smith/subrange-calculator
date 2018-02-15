import { observable, action } from 'mobx';

class Store {
    @observable output: Number[] = [];

    @action
    calculate = async (data: any) => {
        try {
            const res = await fetch('/api/submitFile', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    values: data
                })
            });
            if (res.status !== 200) {
                throw res;
            }
            const responseData = await res.json();
            this.output = responseData.retVal;
        } catch (err) {
            console.error(err);
        }
    };
}

const store = new Store();
(window as any).store = store;
export default store;
