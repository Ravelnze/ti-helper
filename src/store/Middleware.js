import localStorage from "./middlewares/LocalStorage";

export default ({ state, action, handler }) => {
    const chain = [handler, localStorage];

    return chain.reduce((st, fn) => fn(st, action), state);
};
