import { v4 as uuidv4 } from "uuid";

const Category = {
    Cultural: "Cultural",
    Industrial: "Industrial",
    Hazardous: "Hazardous",
    Frontier: "Frontier",
};

export function AddRelic(relics, relic) {
    relic.instanceId = uuidv4();
    relic.isExhausted = false;

    if (!relics[relic.id]) {
        relics[relic.id] = [];
    } 
    
    relics[relic.id].push(relic);

    return relics;
}

export function RemoveRelic(relics, relic) {
    if (!relics[relic.id]) {
        return relics;
    }

    relics[relic.id] = relics[relic.id].filter(
        (ac) => ac.instanceId !== relic.instanceId
    );

    if (relics[relic.id].length === 0) {
        delete relics[relic.id];
    }

    return relics;
}

export function ExhaustRelic(relics, relic, exhaust) {
    if (!relics[relic.id]) {
        return relics;
    }
    
    const index = relics[relic.id].findIndex(
        (r) => r.instanceId === relic.instanceId
    );
    
    if (index === -1) {
        return relics;
    }

    relics[relic.id][index].isExhausted = exhaust;
    return relics;
}

export function GetRelicVariantColour(category) {
    let variant = {};

    switch (category) {
        case Category.Industrial:
            variant = { colour: "success", text: "text-light" }; // Green
            break;
        case Category.Hazardous:
            variant = { colour: "danger", text: "text-light" }; // Red
            break;
        case Category.Cultural:
            variant = { colour: "primary", text: "text-light" }; // Blue
            break;
        case Category.Frontier:
            variant = { colour: "dark", text: "text-light" }; // Dark
            break;
        default:
            variant = { colour: "warning", text: "text-dark" }; // Relic
            break;
    }

    return variant;
}

export function GetRelicsForPhase(relics, phase) {
    const phaseRelics = {};

    for (let key of Object.keys(relics)) {
        if (relics[key][0].phase.some((p) => ["Any", phase].includes(p))) {
            phaseRelics[key] = relics[key];
        }
    }

    return phaseRelics;
}

export function SetAttachedPlanetRelic(relics, relic, planet) {
    if (!relics[relic.id]) {
        return relics;
    }

    const index = relics[relic.id].findIndex(
        (r) => r.instanceId === relic.instanceId
    );

    if (index === -1) {
        return relics;
    }

    relics[relic.id][index].attachedPlanet = planet;

    return relics;
}