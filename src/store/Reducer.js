import { SetTech, UpdateTech } from '../lib/Tech';
import * as Types from './Types';

const initialState = {
    faction: null,
    technologies: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case Types.SETFACTION:
            localStorage.setItem("faction", JSON.stringify(action.payload));

            return {
                ...state,
                faction: action.payload,
            };
        case Types.SETTECH:
            const setTech = action.payload != null ? SetTech(action.payload) : initialState.technologies;
            localStorage.setItem("tech", JSON.stringify(setTech));

            return {
                ...state,
                technologies: setTech
            };
        case Types.UPDATETECH:
            const updateTech = UpdateTech(state.technologies, action.payload);
            localStorage.setItem("tech", JSON.stringify(updateTech));

            return {
                ...state,
                technologies: updateTech,
            };
        default:
            return state;
    }
};

export {reducer, initialState};
