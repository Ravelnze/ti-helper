import localStorage from "./middlewares/LocalStorage";

const applyMiddleware = ({ state, action, handler }) => {
    const chain = [handler, localStorage];

    return chain.reduce((st, fn) => fn(st, action), state);
};

export default applyMiddleware;
