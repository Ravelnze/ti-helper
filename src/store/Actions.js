import * as Types from "./Types";

export function resetGame() {
    return { type: Types.RESETGAME };
}

export function setPok(usingPok) {
    return {
        type: Types.SETPOK,
        payload: usingPok,
    };
}

export function setGameStarted(gameStarted) {
    return {
        type: Types.SETGAMESTARTED,
        payload: gameStarted,
    };
}

export function setFaction(faction) {
    return {
        type: Types.SETFACTION,
        payload: faction,
    };
}

export function setUnitAvailable(unit, available) {
    return {
        type: Types.SETUNITAVAILABLE,
        payload: { unit, available },
    };
}

export function appendUnitAbilities(unit, abilities) {
    return {
        type: Types.APPENDUNITABILITY,
        payload: { unit, abilities },
    };
}

export function removeExtraAbility(updateableType, unit, instanceId) {
    return {
        type: Types.REMOVEEXTRAABILITY,
        payload: { updateableType, unit, instanceId },
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

export function exhaustLegendary(ability, exhaust) {
    return {
        type: Types.EXHAUSTLEGENDARY,
        payload: { ability, exhaust },
    };
}

export function setPlanet(planet) {
    return {
        type: Types.SETPLANET,
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

export function addAgenda(agenda) {
    return {
        type: Types.ADDAGENDA,
        payload: agenda,
    };
}

export function removeAgenda(agenda) {
    return {
        type: Types.REMOVEAGENDA,
        payload: agenda,
    };
}

export function electOutcome(agenda, outcome) {
    return {
        type: Types.ELECTOUTCOME,
        payload: { agenda, outcome },
    };
}

export function setPhaseTab(tab) {
    return {
        type: Types.SETPHASETAB,
        payload: tab,
    };
}

export function setCombatTab(tab) {
    return {
        type: Types.SETCOMBATTAB,
        payload: tab,
    };
}

export function addPromissory(note) {
    return {
        type: Types.ADDPROMISSORY,
        payload: note,
    };
}

export function removePromissory(note) {
    return {
        type: Types.REMOVEPROMISSORY,
        payload: note,
    };
}

export function setPromissoryColour(note, colour) {
    return {
        type: Types.SETPROMISSORYCOLOUR,
        payload: { note, colour },
    };
}

export function addExplorationCard(card) {
    return {
        type: Types.ADDEXPLORATIONCARD,
        payload: card,
    };
}

export function removeExplorationCard(card) {
    return {
        type: Types.REMOVEEXPLORATIONCARD,
        payload: card,
    };
}

export function setAttachedPlanet(card, planet) {
    return {
        type: Types.SETATTACHEDPLANET,
        payload: { card, planet },
    };
}

export function addRelic(relic) {
    return {
        type: Types.ADDRELIC,
        payload: relic,
    };
}

export function removeRelic(relic) {
    return {
        type: Types.REMOVERELIC,
        payload: relic,
    };
}
