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

export function addTech(tech) {
    return {
        type: Types.ADDTECH,
        payload: tech,
    };
}

export function removeTech(tech) {
    return {
        type: Types.REMOVETECH,
        payload: tech,
    };
}

export function addPlanet(planet) {
    return {
        type: Types.ADDPLANET,
        payload: planet,
    };
}

export function exhaustPlanets(planets, exhaust) {
    return {
        type: Types.EXHAUSTPLANET,
        payload: { planets, exhaust },
    };
}

export function removePlanet(planet) {
    return {
        type: Types.REMOVEPLANET,
        payload: planet,
    };
}

export function addObjective(objective) {
    return {
        type: Types.ADDOBJECTIVE,
        payload: objective,
    };
}

export function completeObjective(objective, completed) {
    return {
        type: Types.COMPLETEOBJECTIVE,
        payload: { objective, completed },
    };
}

export function removeObjective(objective) {
    return {
        type: Types.REMOVEOBJECTIVE,
        payload: objective,
    };
}

export function addActionCard(actionCard) {
    return {
        type: Types.ADDACTIONCARD,
        payload: actionCard,
    };
}

export function removeActionCard(actionCard) {
    return {
        type: Types.REMOVEACTIONCARD,
        payload: actionCard,
    };
}