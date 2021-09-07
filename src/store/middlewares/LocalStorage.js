import store from "store2";

export default (state) => {
    store.set("app", state);
    return state;
};

export const get = (state) => store.get("app");
