import { SetTech, UpdateTech } from "../lib/Tech";
import applyMiddleware from "./Middleware";
import * as Types from "./Types";

export const initialState = {
    faction: null,
    technologies: [],
};

// good guide on why the store is laid out this way
// https://dev.to/vanderleisilva/middlewares-with-react-context-and-hooks-2gm1

function setFaction(state, { payload }) {
    return {
        ...state,
        faction: payload,
    };
}

function setTech(state, { payload }) {
    return {
        ...state,
        technologies:
            payload != null ? SetTech(payload) : [],
    };
}

function updateTech(state, { payload }) {
    return {
        ...state,
        technologies: UpdateTech(state.technologies, payload),
    };
}

const createReducer = (handlers) => (state, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        return state;
    }

    return applyMiddleware({
        state,
        action,
        handler: handlers[action.type],
    });
};

export const reducer = createReducer({
    [Types.SETFACTION]: setFaction,
    [Types.SETTECH]: setTech,
    [Types.UPDATETECH]: updateTech,
});
