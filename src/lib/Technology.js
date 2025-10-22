import Technologies from "../data/technologies.json";
import { Codex } from "./Codices";

export const Categories = {
    Cybernetic: "Cybernetic",
    Propulsion: "Propulsion",
    Biotic: "Biotic",
    Warfare: "Warfare",
    Upgrade: "Upgrade",
};

export function GetTechVariantColour(category) {
    let variant = {};

    switch (category) {
        case Categories.Cybernetic:
            variant = { colour: "warning", text: "dark" }; // Yellow
            break;
        case Categories.Biotic:
            variant = { colour: "success", text: "white" }; // Green
            break;
        case Categories.Warfare:
            variant = { colour: "danger", text: "white" }; // Red
            break;
        case Categories.Propulsion:
            variant = { colour: "primary", text: "white" }; // Blue
            break;
        default:
            variant = { colour: "dark", text: "white" }; // Unknown (faction?)
            break;
    }

    return variant;
}

// takes an array of integer ids
export const SetTech = (techIds) => {
    return Technologies.filter((t) => techIds.includes(t.id));
};

export function AddTech(currentTech, newTech) {
    return [...currentTech.filter((t) => t.replacedBy !== newTech.id), newTech];
}

export function RemoveTech(currentTech, tech) {
    return currentTech.filter((t) => t.id !== tech.id);
}

export function GetTechnologiesForPhase(technologies, phase) {
    return technologies.filter((t) =>
        t.phase.some((p) => ["Any", phase].includes(p))
    );
}

export function ReplaceCodexTechnologyIds(ids, codex) {
    let technologies = Technologies.filter((t) => ids.includes(t.id))
    if (codex.includes(Codex.Ordinian)) {
        technologies.forEach(tech => {
            if (tech.codex?.includes(Codex.Ordinian)) {
                technologies = technologies.filter((t) => t.id !== tech.replaces);
            }
        });
    
        return technologies.map((t) => t.id);
    }

    return technologies.filter((t) => !t.replaces).map((t) => t.id);
}

export function ReplaceCodexTechnologies(technologies, codex) {
    let filteredIds = ReplaceCodexTechnologyIds(technologies.map(t => t.id), codex);
    return Technologies.filter((t) => filteredIds.includes(t.id));
}
