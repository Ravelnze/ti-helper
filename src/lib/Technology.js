import Technologies from "../data/technologies.json";

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
