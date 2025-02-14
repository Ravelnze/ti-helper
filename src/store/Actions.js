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

export function setUnitProperties(unitType, properties) {
    return {
        type: Types.SETUNITPROPERTIES,
        payload: { unitType, properties },
    };
}

export function setExtraVictoryPoints(newPoints) {
    return {
        type: Types.SETEXTRAVICTORYPOINTS,
        payload: newPoints,
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

export function setPromissoryAttached(note, attachment) {
    return {
        type: Types.SETPROMISSORYATTACHED,
        payload: { note, attachment },
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

export function setAttachedPlanetExploration(cardType, planet) {
    return {
        type: Types.SETATTACHEDPLANETEXPLORATION,
        payload: { cardType, planet },
    };
}

export function setAttachedPlanetRelic(card, planet) {
    return {
        type: Types.SETATTACHEDPLANETRELIC,
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

export function exhaustRelic(relic, exhaust) {
    return {
        type: Types.EXHAUSTRELIC,
        payload: { relic, exhaust },
    };
}

export function setLookupFaction(faction) {
    return {
        type: Types.SETLOOKUPFACTION,
        payload: faction,
    };
}

export function addLookupFaction(faction) {
    return {
        type: Types.ADDLOOKUPFACTION,
        payload: faction,
    };
}

export function removeLookupFaction(faction) {
    return {
        type: Types.REMOVELOOKUPFACTION,
        payload: faction,
    };
}

export function setCodex(codexId) {
    return {
        type: Types.SETCODEX,
        payload: codexId,
    };
}

export function removeCodex(codexId) {
    return {
        type: Types.REMOVECODEX,
        payload: codexId
    };
}

export function setStartingFaction(factionId, chosen) {
    return {
        type: Types.SETSTARTINGFACTION,
        payload: {factionId, chosen}
    };
}