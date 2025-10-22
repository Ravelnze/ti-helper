import store from "store2";

const localStorage = (state) => {
    store.set("app", state);
    return state;
};

export const get = (state) => store.get("app");
export default localStorage;