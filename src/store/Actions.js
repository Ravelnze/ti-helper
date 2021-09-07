import * as Types from "./Types";

export function setFaction(faction) {
    return {
        type: Types.SETFACTION,
        payload: faction,
    };
}

export function setTech(techIds) {
    return {
        type: Types.SETTECH,
        payload: techIds,
    };
}

export function updateTech(techIds) {
    return {
        type: Types.UPDATETECH,
        payload: techIds,
    };
}
